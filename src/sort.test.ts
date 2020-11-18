import { Collection } from './types';
import create from './create';
import sort from './sort';
import cache from './cache';

function sortByData<T extends { id: string; data: number } = { id: string; data: number }>(
  asc = false
): (a: T, b: T) => 0 | -1 | 1 {
  return (a: T, b: T) => {
    if (a.data < b.data) return asc ? -1 : 1;
    if (b.data < a.data) return asc ? 1 : -1;
    return 0;
  };
}

describe('sort()', () => {
  const obj = {
    foo: { id: 'foo', data: 5 },
    bar: { id: 'bar', data: 10 },
    baz: { id: 'baz', data: -1 },
  };
  let col: Collection<{ id: string; data: number }>;

  beforeEach(() => {
    col = create(obj);
  });

  afterEach(() => {
    cache.clear();
  });

  it('should sort the order of keys by ascending name, by default', () => {
    expect(cache.get(col).keys).toEqual(['foo', 'bar', 'baz']);
    expect(sort(col)).toBe(col);
    expect(cache.get(col).keys).toEqual(['bar', 'baz', 'foo']);
  });

  it('should use the provided comparison function to sort the order of keys', () => {
    expect(cache.get(col).keys).toEqual(['foo', 'bar', 'baz']);
    expect(sort(col, sortByData(true))).toBe(col);
    expect(cache.get(col).keys).toEqual(['baz', 'foo', 'bar']);
    expect(sort(col, sortByData(false))).toBe(col);
    expect(cache.get(col).keys).toEqual(['bar', 'foo', 'baz']);
  });
});
