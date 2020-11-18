import { Collection } from './types';
import create from './create';
import reverse from './reverse';
import cache from './cache';

describe('reverse()', () => {
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

  it('should reverse the order of collection IDs', () => {
    expect(cache.get(col).keys).toEqual(['foo', 'bar', 'baz']);
    expect(reverse(col)).toBe(col);
    expect(cache.get(col).keys).toEqual(['baz', 'bar', 'foo']);
  });
});
