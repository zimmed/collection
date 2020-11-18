import { Collection } from './types';
import create from './create';
import iterate from './iterate';
import setOrder from './setOrder';
import cache from './cache';

describe('iterate()', () => {
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
    let i = 0;

    for (const record of iterate(col)) {
      expect(record.id).toBe(cache.get(col).keys[i]);
      i += 1;
    }

    setOrder(col, ['baz', 'foo']);
    i = 0;

    for (const record of iterate(col)) {
      expect(record.id).toBe(cache.get(col).keys[i]);
      i += 1;
    }

    expect(Array.from(iterate(col)).map((r) => r.id)).toEqual(cache.get(col).keys);
  });
});
