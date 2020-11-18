import { Collection } from './types';
import create from './create';
import search from './search';
import cache from './cache';

function compareData(data: number): (r: { id: string; data: number }) => 0 | 1 | -1 {
  return (r) => (data < r.data ? -1 : data > r.data ? 1 : 0);
}

describe('search()', () => {
  const obj = {
    fib: { id: 'fib', data: -100 },
    baz: { id: 'baz', data: -1 },
    foo: { id: 'foo', data: 5 },
    spam: { id: 'spam', data: 7 },
    bar: { id: 'bar', data: 10 },
    eggs: { id: 'eggs', data: 42 },
  };
  let col: Collection<{ id: string; data: number }>;

  beforeEach(() => {
    col = create(obj);
  });

  afterEach(() => {
    cache.clear();
  });

  it('should find an existing record in a sorted collection and return it', () => {
    expect(search(col, compareData(10))).toEqual({ id: 'bar', data: 10 });
    expect(search(col, compareData(-1))).toEqual({ id: 'baz', data: -1 });
    expect(search(col, compareData(-100))).toEqual({ id: 'fib', data: -100 });
    expect(search(col, compareData(42))).toEqual({ id: 'eggs', data: 42 });
  });

  it('should return undefined if no record is found', () => {
    expect(search(col, compareData(100))).toBeUndefined();
  });

  describe('search.index()', () => {
    it('should find an existing record and return the ordered index', () => {
      expect(search.index(col, compareData(10))).toEqual(4);
      expect(search.index(col, compareData(-1))).toEqual(1);
      expect(search.index(col, compareData(-100))).toEqual(0);
      expect(search.index(col, compareData(42))).toEqual(5);
    });

    it('should return -1 if no record is found', () => {
      expect(search.index(col, compareData(100))).toBe(-1);
    });
  });
});
