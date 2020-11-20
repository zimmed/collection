import { Collection } from './types';
import create from './create';
import move from './move';
import cache from './cache';

describe('move()', () => {
  const obj = {
    foo: { id: 'foo', data: 5 },
    bar: { id: 'bar', data: 10 },
    baz: { id: 'baz', data: 7 },
    zab: { id: 'zab', data: 7 },
  };
  let col: Collection<{ id: string; data: number }>;

  beforeEach(() => {
    col = create(obj);
  });

  afterEach(() => {
    cache.clear();
  });

  it('should move record to specified index and squash hole', () => {
    expect(cache.get(col).keys).toEqual(['foo', 'bar', 'baz', 'zab']);
    expect(move(col, 'foo', 2)).toBe(col);
    expect(cache.get(col).keys).toEqual(['bar', 'foo', 'baz', 'zab']);
    expect(move(col, 'zab', 1)).toBe(col);
    expect(cache.get(col).keys).toEqual(['bar', 'zab', 'foo', 'baz']);
    expect(move(col, 'zab', 0)).toBe(col);
    expect(cache.get(col).keys).toEqual(['zab', 'bar', 'foo', 'baz']);
    expect(move(col, 'bar', -1)).toBe(col);
    expect(cache.get(col).keys).toEqual(['bar', 'zab', 'foo', 'baz']);
    expect(move(col, 'eggs', 2)).toBe(col);
    expect(cache.get(col).keys).toEqual(['bar', 'zab', 'foo', 'baz']);
    expect(move(col, 'zab', 3)).toBe(col);
    expect(cache.get(col).keys).toEqual(['bar', 'foo', 'zab', 'baz']);
    expect(move(col, 'zab', 4)).toBe(col);
    expect(cache.get(col).keys).toEqual(['bar', 'foo', 'baz', 'zab']);
    expect(move(col, 'zab', 5)).toBe(col);
    expect(cache.get(col).keys).toEqual(['bar', 'foo', 'baz', 'zab']);
    expect(move(col, 'bar', 5)).toBe(col);
    expect(cache.get(col).keys).toEqual(['foo', 'baz', 'zab', 'bar']);
  });

  describe('move.at', () => {
    it('should move record at the specified index to the next provided index', () => {
      expect(cache.get(col).keys).toEqual(['foo', 'bar', 'baz', 'zab']);
      expect(move.at(col, 0, 2)).toBe(col);
      expect(cache.get(col).keys).toEqual(['bar', 'foo', 'baz', 'zab']);
      expect(move.at(col, 3, 1)).toBe(col);
      expect(cache.get(col).keys).toEqual(['bar', 'zab', 'foo', 'baz']);
      expect(move.at(col, 2, 2)).toBe(col);
      expect(cache.get(col).keys).toEqual(['bar', 'zab', 'foo', 'baz']);
      expect(move.at(col, 1, 0)).toBe(col);
      expect(cache.get(col).keys).toEqual(['zab', 'bar', 'foo', 'baz']);
      expect(move.at(col, 1, -1)).toBe(col);
      expect(cache.get(col).keys).toEqual(['bar', 'zab', 'foo', 'baz']);
      expect(move.at(col, 5, 2)).toBe(col);
      expect(cache.get(col).keys).toEqual(['bar', 'zab', 'foo', 'baz']);
      expect(move.at(col, -1, 2)).toBe(col);
      expect(cache.get(col).keys).toEqual(['bar', 'zab', 'foo', 'baz']);
      expect(move.at(col, 1, 3)).toBe(col);
      expect(cache.get(col).keys).toEqual(['bar', 'foo', 'zab', 'baz']);
      expect(move.at(col, 2, 4)).toBe(col);
      expect(cache.get(col).keys).toEqual(['bar', 'foo', 'baz', 'zab']);
      expect(move.at(col, 3, 5)).toBe(col);
      expect(cache.get(col).keys).toEqual(['bar', 'foo', 'baz', 'zab']);
      expect(move.at(col, 0, 5)).toBe(col);
      expect(cache.get(col).keys).toEqual(['foo', 'baz', 'zab', 'bar']);
    });
  });
});
