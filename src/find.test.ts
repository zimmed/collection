import { Collection } from './types';
import create from './create';
import find from './find';
import cache from './cache';

describe('find()', () => {
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

  it('should find an existing record and return it', () => {
    expect(find(col, (r) => r.data === 10)).toEqual({ id: 'bar', data: 10 });
    expect(find(col, (r) => r.data === -1)).toEqual({ id: 'baz', data: -1 });
    expect(cache.get(col).keys).toEqual(['foo', 'bar', 'baz']);
  });

  it('should return undefined if no record is found', () => {
    expect(find(col, (r) => r.data === 100)).toBeUndefined();
  });

  describe('find.index()', () => {
    it('should find an existing record and return the ordered index', () => {
      expect(find.index(col, (r) => r.data === 10)).toBe(1);
      expect(find.index(col, (r) => r.data === -1)).toBe(2);
      expect(cache.get(col).keys).toEqual(['foo', 'bar', 'baz']);
    });

    it('should return -1 if no record is found', () => {
      expect(find.index(col, (r) => r.data === 100)).toBe(-1);
    });
  });
});
