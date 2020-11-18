import { Collection } from './types';
import create from './create';
import remove from './remove';
import cache from './cache';

describe('remove()', () => {
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

  it('should remove an existing record and return it', () => {
    expect(cache.get(col).keys.length).toBe(3);
    expect(remove(col, 'foo')).toEqual([{ id: 'foo', data: 5 }]);
    expect(cache.get(col).keys).toEqual(['bar', 'baz']);
  });

  it('should return empty array if record does not exist', () => {
    expect(cache.get(col).keys.length).toBe(3);
    expect(remove(col, 'foo')).toEqual([{ id: 'foo', data: 5 }]);
    expect(cache.get(col).keys.length).toBe(2);
    expect(remove(col, 'foo')).toEqual([]);
    expect(cache.get(col).keys).toEqual(['bar', 'baz']);
  });

  it('should remove several records and return them', () => {
    expect(cache.get(col).keys.length).toBe(3);
    expect(remove(col, 'foo', 'bar')).toEqual([
      { id: 'foo', data: 5 },
      { id: 'bar', data: 10 },
    ]);
    expect(cache.get(col).keys.length).toBe(1);
    expect(cache.get(col).keys).toEqual(['baz']);
  });

  describe('remove.at()', () => {
    it('should remove an existing record by index and return it', () => {
      expect(cache.get(col).keys.length).toBe(3);
      expect(remove.at(col, 0)).toEqual({ id: 'foo', data: 5 });
      expect(cache.get(col).keys).toEqual(['bar', 'baz']);
      expect(remove.at(col, 0)).toEqual({ id: 'bar', data: 10 });
      expect(cache.get(col).keys).toEqual(['baz']);
    });

    it('should return undefined if record does not exist', () => {
      expect(cache.get(col).keys.length).toBe(3);
      expect(remove.at(col, 3)).toBeUndefined();
      expect(cache.get(col).keys.length).toBe(3);
    });
  });

  describe('remove.one()', () => {
    it('should remove a single record from collection by ID and return it', () => {
      expect(cache.get(col).keys.length).toBe(3);
      expect(remove.one(col, 'foo')).toEqual({ id: 'foo', data: 5 });
      expect(cache.get(col).keys.length).toBe(2);
      expect(remove.one(col, 'bar')).toEqual({ id: 'bar', data: 10 });
      expect(cache.get(col).keys.length).toBe(1);
      expect(remove.one(col, 'bar')).toBeUndefined();
      expect(cache.get(col).keys).toEqual(['baz']);
    });
  });

  describe('remove.by()', () => {
    it('should remove any records that match the predicate and return them', () => {
      expect(remove.by(col, (r) => r.data > 0)).toEqual([
        { id: 'foo', data: 5 },
        { id: 'bar', data: 10 },
      ]);
      expect(col.foo).toBeUndefined();
      expect(col.bar).toBeUndefined();
    });
    it('should return an empty array if no matches', () => {
      expect(remove.by(col, (r) => !r.data)).toEqual([]);
      expect(col.foo).toBeDefined();
      expect(col.bar).toBeDefined();
      expect(col.baz).toBeDefined();
    });
  });
});
