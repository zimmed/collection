import { Collection } from './types';
import create from './create';
import append from './append';
import cache from './cache';

describe('append()', () => {
  const obj = {
    foo: { id: 'foo', data: 5 },
    bar: { id: 'bar', data: 10 },
  };
  const a = { id: 'baz', data: -1 };
  const b = { id: 'bar', data: -5 };
  let col: Collection<{ id: string; data: number }>;

  beforeEach(() => {
    col = create(obj);
  });

  afterEach(() => {
    cache.clear();
  });

  it('should add a new record, inserting the key at the end of the list', () => {
    expect(cache.get(col).keys.length).toBe(2);
    expect(append(col, a)).toBe(col);
    expect(cache.get(col).keys.length).toBe(3);
    expect(cache.get(col).keys[2]).toBe(a.id);
    expect(col.baz.data).toBe(-1);
  });

  it('should update an existing record', () => {
    expect(cache.get(col).keys.length).toBe(2);
    expect(col.bar.data).toBe(10);
    expect(append(col, b)).toBe(col);
    expect(cache.get(col).keys[1]).toBe(b.id);
    expect(col.bar.data).toBe(-5);
  });

  it('should upsert several records', () => {
    expect(cache.get(col).keys.length).toBe(2);
    expect(col.bar.data).toBe(10);
    expect(append(col, a, b)).toBe(col);
    expect(cache.get(col).keys).toEqual(['foo', 'bar', 'baz']);
    expect(col.bar.data).toBe(-5);
  });

  describe('append.one()', () => {
    it('it should add a single record', () => {
      expect(cache.get(col).keys.length).toBe(2);
      expect(append.one(col, a)).toBe(col);
      expect(cache.get(col).keys.length).toBe(3);
      expect(cache.get(col).keys[2]).toBe(a.id);
      expect(col.baz.data).toBe(-1);
      expect(col.bar.data).toBe(10);
      expect(append.one(col, b)).toBe(col);
      expect(cache.get(col).keys[1]).toBe(b.id);
      expect(col.bar.data).toBe(-5);
    });
  });
});
