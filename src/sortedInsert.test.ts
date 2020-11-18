import { Collection } from './types';
import create from './create';
import sort from './sort';
import sortedInsert from './sortedInsert';
import cache from './cache';

function comp<T extends { id: string; data: number }>(a: T, b: T): 0 | -1 | 1 {
  if (a.data < b.data) return -1;
  if (a.data > b.data) return 1;
  if (a.id < b.id) return -1;
  if (a.id > b.id) return 1;
  return 0;
}

describe('sortedInsert()', () => {
  const obj = {
    foo: { id: 'foo', data: 5 },
    bar: { id: 'bar', data: 10 },
  };
  const a = { id: 'baz', data: 7 };
  const b = { id: 'bar', data: -1 };
  const c = { id: 'zab', data: 7 };
  let col: Collection<{ id: string; data: number }>;

  beforeEach(() => {
    col = create(obj);
  });

  afterEach(() => {
    cache.clear();
  });

  it('should add a new record, sortInserting the key by default comparison', () => {
    sort(col);
    expect(cache.get(col).keys.length).toBe(2);
    expect(sortedInsert(col, a)).toBe(col);
    expect(cache.get(col).keys).toEqual(['bar', 'baz', 'foo']);
    expect(col.baz.data).toBe(7);
  });

  it('should add a new record, sortInserting the key by specified comparison', () => {
    expect(cache.get(col).keys.length).toBe(2);
    expect(sortedInsert(col, a, comp)).toBe(col);
    expect(cache.get(col).keys).toEqual(['foo', 'baz', 'bar']);
    expect(col.baz.data).toBe(7);
  });

  it('should update and rearrange an existing record', () => {
    expect(cache.get(col).keys).toEqual(['foo', 'bar']);
    expect(col.bar.data).toBe(10);
    expect(sortedInsert(col, b, comp)).toBe(col);
    expect(cache.get(col).keys).toEqual(['bar', 'foo']);
    expect(col.bar.data).toBe(-1);
  });

  it('should upsert and rearrange several records', () => {
    expect(cache.get(col).keys.length).toBe(2);
    expect(col.bar.data).toBe(10);
    expect(sortedInsert(col, c, b, a, comp)).toBe(col);
    expect(cache.get(col).keys).toEqual(['bar', 'foo', 'baz', 'zab']);
    expect(col.bar.data).toBe(-1);
  });

  it('should have a `one` method optimized for sortInserting a single record with default comparison', () => {
    sort(col);
    expect(cache.get(col).keys.length).toBe(2);
    expect(sortedInsert.one(col, a)).toBe(col);
    expect(cache.get(col).keys).toEqual(['bar', 'baz', 'foo']);
    expect(col.baz.data).toBe(7);
    expect(col.bar.data).toBe(10);
    expect(sortedInsert.one(col, b)).toBe(col);
    expect(cache.get(col).keys).toEqual(['bar', 'baz', 'foo']);
    expect(col.bar.data).toBe(-1);
  });

  it('should have a `one` method optimized for sortInserting a single record', () => {
    expect(cache.get(col).keys.length).toBe(2);
    expect(sortedInsert.one(col, a, comp)).toBe(col);
    expect(cache.get(col).keys).toEqual(['foo', 'baz', 'bar']);
    expect(col.baz.data).toBe(7);
    expect(col.bar.data).toBe(10);
    expect(sortedInsert.one(col, b, comp)).toBe(col);
    expect(cache.get(col).keys).toEqual(['bar', 'foo', 'baz']);
    expect(col.bar.data).toBe(-1);
    expect(sortedInsert.one(create(), { id: 'foo' })).toEqual({ foo: { id: 'foo' } });
  });
});
