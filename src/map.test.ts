import { Collection } from './types';
import create from './create';
import map from './map';
import cache from './cache';
import setOrder from './setOrder';

describe('map()', () => {
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

  it('should map over collection in proper order returning a new array', () => {
    expect(
      map(col, (record, i, keys) => {
        expect(record.id).toBe(cache.get(col).keys[i]);
        expect(keys).toBe(cache.get(col).keys);
        return record.data * 100;
      })
    ).toEqual([500, 1000, -100]);

    setOrder(col, ['baz', 'foo']);

    expect(
      map(col, (record, i, keys) => {
        expect(record.id).toBe(cache.get(col).keys[i]);
        expect(keys).toBe(cache.get(col).keys);
        return record.data * 10;
      })
    ).toEqual([-10, 50, 100]);
  });
});
