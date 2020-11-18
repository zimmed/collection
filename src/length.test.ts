import { Collection } from './types';
import create from './create';
import length from './length';
import cache from './cache';

describe('length()', () => {
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

  it('should get the current order of IDs for the collection', () => {
    expect(length(col)).toBe(3);
    expect(length(create())).toBe(0);
  });
});
