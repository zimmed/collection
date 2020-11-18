import { Collection } from './types';
import create from './create';
import slice from './slice';
import cache from './cache';

describe('slice()', () => {
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

  it('it should return an array of records specified by the start and end index arguments', () => {
    expect(cache.get(col).keys).toEqual(['baz', 'bar', 'foo', 'bee']);
    expect(slice(col)).toEqual(arr);
    expect(slice(col)).not.toBe(arr);
    expect(slice(col, 0)).toEqual(arr);
    expect(slice(col, 0, 1)).toEqual([{ id: 'baz', data: 15 }]);
    expect(slice(col, 1, 3)).toEqual([
      { id: 'bar', data: 20 },
      { id: 'foo', data: 5 },
    ]);
    expect(slice(col, 3, 5)).toEqual([{ id: 'bee', data: 10 }]);
    expect(slice(col, 4, 5)).toEqual([]);
    expect(slice(col, -2, -1)).toEqual([{ id: 'foo', data: 5 }]);
    expect(slice(col, -2)).toEqual([
      { id: 'foo', data: 5 },
      { id: 'bee', data: 10 },
    ]);
    expect(slice(col, -10)).toEqual(arr);
    expect(slice(col, 0, -3)).toEqual([{ id: 'baz', data: 15 }]);
    expect(slice(col, 0, -5)).toEqual([]);
    expect(slice(col, -4)).toEqual(arr);
  });
});
