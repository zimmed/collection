import { Collection } from './types';
import create from './create';
import splice from './splice';
import cache from './cache';

describe('splice()', () => {
  const arr = [
    { id: 'baz', data: 15 },
    { id: 'bar', data: 20 },
    { id: 'foo', data: 5 },
    { id: 'bee', data: 10 },
  ];
  let col: Collection<{ id: string; data: number }>;

  beforeEach(() => {
    col = create(arr);
  });

  afterEach(() => {
    cache.clear();
  });

  it('it should return the array of records specified by the start and end index arguments that have been removed from the collection', () => {
    expect(cache.get(col).keys).toEqual(['baz', 'bar', 'foo', 'bee']);
    expect(splice(col)).toEqual(arr);
    expect(cache.get(col).keys).toEqual([]);
    col = create(arr);
    expect(splice(col)).not.toBe(arr);
    col = create(arr);
    expect(splice(col, 0)).toEqual(arr);
    col = create(arr);
    expect(col.baz).toBe(arr[0]);
    expect(splice(col, 0, 1)).toEqual([{ id: 'baz', data: 15 }]);
    expect(cache.get(col).keys).toEqual(['bar', 'foo', 'bee']);
    expect(col.baz).toBeUndefined();
    col = create(arr);
    expect(splice(col, 1, 2)).toEqual([
      { id: 'bar', data: 20 },
      { id: 'foo', data: 5 },
    ]);
    expect(cache.get(col).keys).toEqual(['baz', 'bee']);
    expect(col.bar).toBeUndefined();
    expect(col.foo).toBeUndefined();
    col = create(arr);
    expect(splice(col, 3, 2)).toEqual([{ id: 'bee', data: 10 }]);
    expect(cache.get(col).keys).toEqual(['baz', 'bar', 'foo']);
    col = create(arr);
    expect(splice(col, 4, 2)).toEqual([]);
    expect(cache.get(col).keys).toEqual(['baz', 'bar', 'foo', 'bee']);
    expect(splice(col, -2, 1)).toEqual([{ id: 'foo', data: 5 }]);
    expect(cache.get(col).keys).toEqual(['baz', 'bar', 'bee']);
    expect(col.foo).toBeUndefined();
    col = create(arr);
    expect(splice(col, -2)).toEqual([
      { id: 'foo', data: 5 },
      { id: 'bee', data: 10 },
    ]);
    expect(cache.get(col).keys).toEqual(['baz', 'bar']);
    col = create(arr);
    expect(splice(col, -10)).toEqual(arr);
    expect(cache.get(col).keys).toEqual([]);
    col = create(arr);
    expect(splice(col, -4)).toEqual(arr);
    expect(cache.get(col).keys).toEqual([]);
  });
});
