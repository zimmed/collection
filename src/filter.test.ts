import { Collection } from './types';
import create from './create';
import filter from './filter';
import cache from './cache';
import setOrder from './setOrder';

describe('filter()', () => {
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
      filter(col, (record, i, keys) => {
        expect(record.id).toBe(cache.get(col).keys[i]);
        expect(keys).toBe(cache.get(col).keys);
        return record.data > 0;
      })
    ).toEqual([
      { id: 'foo', data: 5 },
      { id: 'bar', data: 10 },
    ]);

    setOrder(col, ['baz', 'foo']);

    expect(
      filter(col, (record, i, keys) => {
        expect(record.id).toBe(cache.get(col).keys[i]);
        expect(keys).toBe(cache.get(col).keys);
        return record.data < 0;
      })
    ).toEqual([{ id: 'baz', data: -1 }]);

    expect(
      filter(col, (record, i, keys) => {
        expect(record.id).toBe(cache.get(col).keys[i]);
        expect(keys).toBe(cache.get(col).keys);
        return !record.data;
      })
    ).toEqual([]);
  });
});
