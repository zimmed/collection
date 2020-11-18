import { Collection } from './types';
import create from './create';
import append from './append';
import shift from './shift';
import cache from './cache';

describe('shift()', () => {
  let col: Collection<{ id: string; data: number }>;

  beforeEach(() => {
    col = create();
    append(col, { id: 'baz', data: -1 }, { id: 'foo', data: 5 }, { id: 'bar', data: 10 });
  });

  afterEach(() => {
    cache.clear();
  });

  it('should should shift/dequeue and return the element associated to the key at the head of the keys array', () => {
    expect(cache.get(col).keys.length).toBe(3);
    expect(shift(col)).toEqual({ id: 'baz', data: -1 });
    expect(cache.get(col).keys).toEqual(['foo', 'bar']);
    expect(shift(col)).toEqual({ id: 'foo', data: 5 });
    expect(shift(col)).toEqual({ id: 'bar', data: 10 });
    expect(cache.get(col).keys).toEqual([]);
    expect(shift(col)).toBeUndefined();
    expect(cache.get(col).keys).toEqual([]);
  });
});
