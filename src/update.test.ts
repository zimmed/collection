import { Collection } from './types';
import create from './create';
import update from './update';
import cache from './cache';
import setOrder from './setOrder';

describe('update()', () => {
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

  it('should map over and update collection records in proper order', () => {
    expect(
      update(col, (record, i, keys) => {
        expect(record.id).toBe(cache.get(col).keys[i]);
        expect(keys).toBe(cache.get(col).keys);
        record.data *= 100;
        return record;
      })
    ).toBe(col);
    expect(col.foo.data).toBe(500);
    expect(col.bar.data).toBe(1000);
    expect(col.baz.data).toBe(-100);

    setOrder(col, ['baz', 'foo']);

    expect(
      update(col, (record, i, keys) => {
        expect(record.id).toBe(cache.get(col).keys[i]);
        expect(keys).toBe(cache.get(col).keys);
        record.data -= 100;
        return record;
      })
    ).toBe(col);
    expect(col.foo.data).toBe(400);
    expect(col.bar.data).toBe(900);
    expect(col.baz.data).toBe(-200);
  });
});
