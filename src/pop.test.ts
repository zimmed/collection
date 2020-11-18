import { Collection } from './types';
import create from './create';
import append from './append';
import pop from './pop';
import cache from './cache';

describe('pop()', () => {
  let col: Collection<{ id: string; data: number }>;

  beforeEach(() => {
    col = create();
    append(col, { id: 'baz', data: -1 }, { id: 'foo', data: 5 }, { id: 'bar', data: 10 });
  });

  afterEach(() => {
    cache.clear();
  });

  it('should should pop and return the element associated to the key at the tail of the keys array', () => {
    expect(cache.get(col).keys.length).toBe(3);
    expect(pop(col)).toEqual({ id: 'bar', data: 10 });
    expect(cache.get(col).keys).toEqual(['baz', 'foo']);
    expect(pop(col)).toEqual({ id: 'foo', data: 5 });
    expect(pop(col)).toEqual({ id: 'baz', data: -1 });
    expect(cache.get(col).keys).toEqual([]);
    expect(pop(col)).toBeUndefined();
    expect(cache.get(col).keys).toEqual([]);
  });
});
