import { Collection } from './types';
import create from './create';
import forEach from './forEach';
import cache from './cache';
import setOrder from './setOrder';

describe('forEach()', () => {
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

  it('should iterate over collection in proper order', () => {
    forEach(col, (record, i, keys) => {
      expect(record.id).toBe(cache.get(col).keys[i]);
      expect(keys).toBe(cache.get(col).keys);
    });

    setOrder(col, ['baz', 'foo']);

    forEach(col, (record, i) => {
      expect(record.id).toBe(cache.get(col).keys[i]);
    });
  });
});
