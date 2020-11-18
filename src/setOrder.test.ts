import { Collection } from './types';
import create from './create';
import setOrder from './setOrder';
import cache from './cache';

describe('setOrder()', () => {
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

  it('should set the order from the oredered list of IDs', () => {
    expect(cache.get(col).keys).toEqual(['foo', 'bar', 'baz']);
    expect(setOrder(col, ['bar', 'foo', 'baz'])).toBe(col);
    expect(cache.get(col).keys).toEqual(['bar', 'foo', 'baz']);
  });

  it('should set the preferred order of provided IDs and concat the remainder', () => {
    expect(cache.get(col).keys).toEqual(['foo', 'bar', 'baz']);
    expect(setOrder(col, ['bar', 'bad'])).toBe(col);
    expect(cache.get(col).keys).toEqual(['bar', 'foo', 'baz']);
  });
});
