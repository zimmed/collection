import { Collection } from './types';
import create from './create';
import getOrder from './getOrder';
import cache from './cache';

describe('getOrder()', () => {
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
    expect(cache.get(col).keys).toEqual(getOrder(col));
  });
});
