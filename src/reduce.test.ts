import { Collection } from './types';
import create from './create';
import reduce from './reduce';
import cache from './cache';
import setOrder from './setOrder';

describe('reduce()', () => {
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

  it('should reduce collection records in proper order', () => {
    expect(
      reduce(
        col,
        (t, record, i, keys) => {
          expect(record.id).toBe(cache.get(col).keys[i]);
          expect(keys).toBe(cache.get(col).keys);
          return t + record.data;
        },
        0
      )
    ).toEqual(14);

    setOrder(col, ['baz', 'foo']);

    expect(
      reduce(
        col,
        (t, record, i, keys) => {
          expect(record.id).toBe(cache.get(col).keys[i]);
          expect(keys).toBe(cache.get(col).keys);
          return t + record.data * 10;
        },
        0
      )
    ).toEqual(140);
  });

  it('should have a `right` method that reduces collection in reverse order', () => {
    expect(
      reduce.right(
        col,
        (t, record, i, keys) => {
          expect(record.id).toBe(cache.get(col).keys[i]);
          expect(keys).toBe(cache.get(col).keys);
          return t + record.data;
        },
        0
      )
    ).toEqual(14);

    setOrder(col, ['baz', 'foo']);

    expect(
      reduce.right(
        col,
        (t, record, i, keys) => {
          expect(record.id).toBe(cache.get(col).keys[i]);
          expect(keys).toBe(cache.get(col).keys);
          return t + record.data * 10;
        },
        0
      )
    ).toEqual(140);
  });
});
