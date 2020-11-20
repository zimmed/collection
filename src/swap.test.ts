import { Collection } from './types';
import create from './create';
import swap from './swap';
import cache from './cache';

describe('swap()', () => {
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

  it('should swap specified records', () => {
    expect(cache.get(col).keys).toEqual(['foo', 'bar', 'baz', 'zab']);
    expect(swap(col, 'foo', 'baz')).toBe(col);
    expect(cache.get(col).keys).toEqual(['baz', 'bar', 'foo', 'zab']);
    expect(swap(col, 'zab', 'bar')).toBe(col);
    expect(cache.get(col).keys).toEqual(['baz', 'zab', 'foo', 'bar']);
    expect(swap(col, 'zab', 'eggs')).toBe(col);
    expect(cache.get(col).keys).toEqual(['baz', 'zab', 'foo', 'bar']);
    expect(swap(col, 'eggs', 'bar')).toBe(col);
    expect(cache.get(col).keys).toEqual(['baz', 'zab', 'foo', 'bar']);
    expect(swap(col, 'bar', 'bar')).toBe(col);
    expect(cache.get(col).keys).toEqual(['baz', 'zab', 'foo', 'bar']);
  });

  describe('swap.index()', () => {
    it('should swap record with the specified index', () => {
      expect(cache.get(col).keys).toEqual(['foo', 'bar', 'baz', 'zab']);
      expect(swap.index(col, 'foo', 2)).toBe(col);
      expect(cache.get(col).keys).toEqual(['baz', 'bar', 'foo', 'zab']);
      expect(swap.index(col, 'zab', 1)).toBe(col);
      expect(cache.get(col).keys).toEqual(['baz', 'zab', 'foo', 'bar']);
      expect(swap.index(col, 'foo', -2)).toBe(col);
      expect(cache.get(col).keys).toEqual(['foo', 'baz', 'zab', 'bar']);
      expect(swap.index(col, 'foo', 5)).toBe(col);
      expect(cache.get(col).keys).toEqual(['baz', 'zab', 'bar', 'foo']);
      expect(swap.index(col, 'eggs', 2)).toBe(col);
      expect(cache.get(col).keys).toEqual(['baz', 'zab', 'bar', 'foo']);
      expect(swap.index(col, 'bar', 2)).toBe(col);
      expect(cache.get(col).keys).toEqual(['baz', 'zab', 'bar', 'foo']);
    });
  });

  describe('swap.at()', () => {
    it('should swap record with the specified index', () => {
      expect(cache.get(col).keys).toEqual(['foo', 'bar', 'baz', 'zab']);
      expect(swap.at(col, 0, 'baz')).toBe(col);
      expect(cache.get(col).keys).toEqual(['baz', 'bar', 'foo', 'zab']);
      expect(swap.at(col, 3, 'bar')).toBe(col);
      expect(cache.get(col).keys).toEqual(['baz', 'zab', 'foo', 'bar']);
      expect(swap.at(col, 1, 'eggs')).toBe(col);
      expect(cache.get(col).keys).toEqual(['baz', 'zab', 'foo', 'bar']);
      expect(swap.at(col, 5, 'bar')).toBe(col);
      expect(cache.get(col).keys).toEqual(['baz', 'zab', 'foo', 'bar']);
      expect(swap.at(col, -1, 'bar')).toBe(col);
      expect(cache.get(col).keys).toEqual(['baz', 'zab', 'foo', 'bar']);
      expect(swap.at(col, 3, 'bar')).toBe(col);
      expect(cache.get(col).keys).toEqual(['baz', 'zab', 'foo', 'bar']);
    });
  });

  describe('swap.at.index()', () => {
    it('should swap record with the specified index', () => {
      expect(cache.get(col).keys).toEqual(['foo', 'bar', 'baz', 'zab']);
      expect(swap.at.index(col, 0, 2)).toBe(col);
      expect(cache.get(col).keys).toEqual(['baz', 'bar', 'foo', 'zab']);
      expect(swap.at.index(col, 3, 1)).toBe(col);
      expect(cache.get(col).keys).toEqual(['baz', 'zab', 'foo', 'bar']);
      expect(swap.at.index(col, 2, -2)).toBe(col);
      expect(cache.get(col).keys).toEqual(['foo', 'baz', 'zab', 'bar']);
      expect(swap.at.index(col, 0, 5)).toBe(col);
      expect(cache.get(col).keys).toEqual(['baz', 'zab', 'bar', 'foo']);
      expect(swap.at.index(col, -1, 2)).toBe(col);
      expect(cache.get(col).keys).toEqual(['baz', 'zab', 'bar', 'foo']);
      expect(swap.at.index(col, 5, 2)).toBe(col);
      expect(cache.get(col).keys).toEqual(['baz', 'zab', 'bar', 'foo']);
      expect(swap.at.index(col, 2, 2)).toBe(col);
      expect(cache.get(col).keys).toEqual(['baz', 'zab', 'bar', 'foo']);
    });
  });
});
