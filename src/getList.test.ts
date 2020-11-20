import { Collection } from './types';
import create from './create';
import getList from './getList';
import cache from './cache';

describe('getList()', () => {
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

  it('should get the current ordered list of records', () => {
    expect(cache.get(col).keys.map((k) => obj[k as keyof typeof obj])).toEqual(getList(col));
  });
});
