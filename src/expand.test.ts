import { Collection } from './types';
import create from './create';
import expand from './expand';
import cache from './cache';

describe('expand()', () => {
  let chapters: Collection<{
    id: string;
    characters: number[];
    scene: string;
    n: null;
    others: Array<{ char: number; name: string }>;
    books?: string[];
  }>;
  let characters: Collection<{ id: number; name: string; gender?: string }>;
  let scenes: Collection<{ id: string; name: string; stuff: number[] }>;
  let books: Collection<{ id: string; name: string; chapters: string[]; favoriteScene: string }>;

  beforeEach(() => {
    chapters = create([
      { id: 'ch1', characters: [1, 2], scene: 's1', n: null, others: [] },
      { id: 'ch2', characters: [1, 3, 9], scene: 's3', n: null, others: [{ char: 2, name: 'Dumbdumb' }] },
      { id: 'ch3', characters: [1, 2, 3], scene: 's4', n: null, others: [] },
    ]);
    characters = create([
      { id: 1, name: 'Booger', gender: 'm' },
      { id: 2, name: 'Elephump' },
      { id: 3, name: 'Kingmeister' },
    ]);
    scenes = create([
      { id: 's1', name: 'Hot Springs', stuff: [0, 1, 2] },
      { id: 's2', name: "Dragon's Lair", stuff: [] },
      { id: 's3', name: 'The White House', stuff: [] },
      { id: 's4', name: 'Prison', stuff: [] },
    ]);
    books = create([
      { id: 'book1', name: 'Extended Edition', chapters: ['ch1', 'ch2', 'ch3', 'ch10'], favoriteScene: 's1' },
      { id: 'book2', name: 'Abridged Version', chapters: ['ch1', 'ch3'], favoriteScene: 's1' },
    ]);
  });

  afterEach(() => {
    cache.clear();
  });

  it('should expand collection references', () => {
    const expanded = expand(books, {
      chapters: [chapters],
      characters: [characters],
      scene: scenes,
      char: characters,
      favoriteScene: scenes,
    });

    expect(expanded).toBeTruthy();
    expect(expanded.book1).toEqual({
      id: 'book1',
      name: 'Extended Edition',
      chapters: [
        {
          id: 'ch1',
          n: null,
          others: [],
          scene: { id: 's1', name: 'Hot Springs', stuff: [0, 1, 2] },
          characters: [
            { id: 1, name: 'Booger', gender: 'm' },
            { id: 2, name: 'Elephump' },
          ],
        },
        {
          id: 'ch2',
          scene: { id: 's3', name: 'The White House', stuff: [] },
          n: null,
          others: [{ char: { id: 2, name: 'Elephump' }, name: 'Dumbdumb' }],
          characters: [{ id: 1, name: 'Booger', gender: 'm' }, { id: 3, name: 'Kingmeister' }, undefined],
        },
        {
          id: 'ch3',
          scene: { id: 's4', name: 'Prison', stuff: [] },
          n: null,
          others: [],
          characters: [
            { id: 1, name: 'Booger', gender: 'm' },
            { id: 2, name: 'Elephump' },
            { id: 3, name: 'Kingmeister' },
          ],
        },
        undefined,
      ],
      favoriteScene: { id: 's1', name: 'Hot Springs', stuff: [0, 1, 2] },
    });
    expect(expanded.book2).toEqual({
      id: 'book2',
      name: 'Abridged Version',
      chapters: [
        {
          id: 'ch1',
          n: null,
          others: [],
          scene: { id: 's1', name: 'Hot Springs', stuff: [0, 1, 2] },
          characters: [
            { id: 1, name: 'Booger', gender: 'm' },
            { id: 2, name: 'Elephump' },
          ],
        },
        {
          id: 'ch3',
          scene: { id: 's4', name: 'Prison', stuff: [] },
          n: null,
          others: [],
          characters: [
            { id: 1, name: 'Booger', gender: 'm' },
            { id: 2, name: 'Elephump' },
            { id: 3, name: 'Kingmeister' },
          ],
        },
      ],
      favoriteScene: { id: 's1', name: 'Hot Springs', stuff: [0, 1, 2] },
    });
  });

  it('should maintain references to the original records', () => {
    const expanded = expand(books, { chapters: [chapters], characters: [characters], scene: scenes });
    const Booger = expanded.book1.chapters[0]?.characters[0];

    expect(Booger).toEqual(characters[1]);
    expect(Booger).toBe(characters[1]);

    if (Booger) Booger.name = 'Ruger';

    expect(Booger?.name).toEqual('Ruger');
    expect(characters[1].name).toEqual('Ruger');

    expect(expanded.book1).toBe(books.book1);
    expect(chapters.ch1.scene).toBe(scenes.s1);
  });

  it('should allow for multiple expansions', () => {
    const expanded = expand(books, { chapters: [chapters], characters: [characters], scene: scenes });
    expect(expanded.book1.chapters[1]?.others[0]?.char).toBe(2);
    expect(expanded.book1.chapters[1]).toBe(chapters.ch2);
    const expanded2 = expand(expanded, {
      chapters: [chapters],
      characters: [characters],
      scene: scenes,
      favoriteScene: scenes,
      char: characters,
    });
    expect(expanded2.book1.chapters[1]?.others[0]?.char).toBe(characters[2]);
  });

  it('should resolve circular dependencies safely', () => {
    chapters = create([
      { id: 'ch1', characters: [1, 2], scene: 's1', n: null, others: [], books: ['book1', 'book2'] },
      {
        id: 'ch2',
        characters: [1, 3, 9],
        scene: 's3',
        n: null,
        others: [{ char: 2, name: 'Dumbdumb' }],
        books: ['book1', 'book2'],
      },
      { id: 'ch3', characters: [1, 2, 3], scene: 's4', n: null, others: [], books: ['book1', 'book2'] },
    ]);
    const expanded = expand(
      expand(books, {
        chapters: [chapters],
        characters: [characters],
        scene: scenes,
        char: characters,
        favoriteScene: scenes,
      }),
      { books: [books] }
    );
    expect(expanded.book1).toBe(expanded.book1.chapters[0]?.books && expanded.book1.chapters[0]?.books[0]);
  });
});
