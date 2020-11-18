import { Collection } from './types';
import create from './create';
import join from './join';
import cache from './cache';

interface Chapter {
  id: string;
  characters: number[];
  scene: string;
  others?: Array<{ char: number; name: string }>;
}

interface Character {
  id: number;
  name: string;
}

interface Scene {
  id: string;
  name: string;
  things?: number[];
}

interface Book {
  id: string;
  name: string;
  chapters: string[];
}

describe('join()', () => {
  let chapters: Collection<Chapter>;
  let characters: Collection<Character>;
  let scenes: Collection<Scene>;
  let books: Collection<Book>;

  beforeEach(() => {
    chapters = create<Chapter>([
      { id: 'ch1', characters: [1, 2], scene: 's1', others: [{ char: 3, name: 'Kingster' }] },
      { id: 'ch2', characters: [1, 3, 9], scene: 's3' },
      { id: 'ch3', characters: [1, 2, 3], scene: 's4' },
    ]);
    characters = create<Character>([
      { id: 1, name: 'Booger' },
      { id: 2, name: 'Elephump' },
      { id: 3, name: 'Kingmeister' },
    ]);
    scenes = create<Scene>([
      { id: 's1', name: 'Hot Springs', things: [0, 1, 2] },
      { id: 's2', name: "Dragon's Lair" },
      { id: 's3', name: 'The White House' },
      { id: 's4', name: 'Prison' },
    ]);
    books = create<Book>([
      { id: 'book1', name: 'Extended Edition', chapters: ['ch1', 'ch2', 'ch3', 'ch10'] },
      { id: 'book2', name: 'Abridged Version', chapters: ['ch1', 'ch3'] },
    ]);
  });

  afterEach(() => {
    cache.clear();
  });

  it('should join collections by reference and return the array of joined records', () => {
    const joinedRecords = join(books, {
      chapters: [chapters],
      characters: [characters],
      scene: scenes,
      char: characters,
    });

    expect(joinedRecords).toBeTruthy();
    expect(joinedRecords).toHaveLength(2);
    expect(joinedRecords[0]).toEqual({
      id: 'book1',
      name: 'Extended Edition',
      chapters: [
        {
          id: 'ch1',
          scene: { id: 's1', name: 'Hot Springs', things: [0, 1, 2] },
          characters: [
            { id: 1, name: 'Booger' },
            { id: 2, name: 'Elephump' },
          ],
          others: [{ char: { id: 3, name: 'Kingmeister' }, name: 'Kingster' }],
        },
        {
          id: 'ch2',
          scene: { id: 's3', name: 'The White House' },
          characters: [{ id: 1, name: 'Booger' }, { id: 3, name: 'Kingmeister' }, undefined],
        },
        {
          id: 'ch3',
          scene: { id: 's4', name: 'Prison' },
          characters: [
            { id: 1, name: 'Booger' },
            { id: 2, name: 'Elephump' },
            { id: 3, name: 'Kingmeister' },
          ],
        },
        undefined,
      ],
    });
    expect(joinedRecords[1]).toEqual({
      id: 'book2',
      name: 'Abridged Version',
      chapters: [
        {
          id: 'ch1',
          scene: { id: 's1', name: 'Hot Springs', things: [0, 1, 2] },
          characters: [
            { id: 1, name: 'Booger' },
            { id: 2, name: 'Elephump' },
          ],
          others: [{ char: { id: 3, name: 'Kingmeister' }, name: 'Kingster' }],
        },
        {
          id: 'ch3',
          scene: { id: 's4', name: 'Prison' },
          characters: [
            { id: 1, name: 'Booger' },
            { id: 2, name: 'Elephump' },
            { id: 3, name: 'Kingmeister' },
          ],
        },
      ],
    });
  });

  it('should create copies of records so the originals are not modified', () => {
    const joinedRecords = join(books, { chapters: [chapters], characters: [characters], scene: scenes });
    const Booger = joinedRecords[0]?.chapters[0]?.characters[0];

    expect(Booger).toEqual(characters[1]);
    expect(Booger).not.toBe(characters[1]);

    if (Booger) Booger.name = 'Ruger';

    expect(Booger?.name).toEqual('Ruger');
    expect(characters[1].name).toEqual('Booger');
  });
});
