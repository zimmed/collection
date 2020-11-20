import { Collection } from './types';
import create from './create';
import insert from './insert';
import cache from './cache';

describe('insert()', () => {
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
    expect(insert(col, a)).toBe(col);
    expect(cache.get(col).keys.length).toBe(3);
    expect(cache.get(col).keys[0]).toBe(a.id);
    expect(col.baz.data).toBe(-1);
  });

  it('should update an existing record', () => {
    expect(cache.get(col).keys.length).toBe(2);
    expect(col.bar.data).toBe(10);
    expect(insert(col, b)).toBe(col);
    expect(cache.get(col).keys[1]).toBe(b.id);
    expect(col.bar.data).toBe(-5);
  });

  it('should upsert several records', () => {
    expect(cache.get(col).keys.length).toBe(2);
    expect(col.bar.data).toBe(10);
    expect(insert(col, a, b)).toBe(col);
    expect(cache.get(col).keys).toEqual(['baz', 'foo', 'bar']);
    expect(col.bar.data).toBe(-5);
  });

  describe('insert.one()', () => {
    it('should insert a single record at the front of the order', () => {
      expect(cache.get(col).keys.length).toBe(2);
      expect(insert.one(col, a)).toBe(col);
      expect(cache.get(col).keys.length).toBe(3);
      expect(cache.get(col).keys[0]).toBe(a.id);
      expect(col.baz.data).toBe(-1);
      expect(col.bar.data).toBe(10);
      expect(insert.one(col, b)).toBe(col);
      expect(cache.get(col).keys[2]).toBe(b.id);
      expect(col.bar.data).toBe(-5);
    });
  });

  describe('insert.at()', () => {
    it('should insert the given record at the specified index', () => {
      expect(cache.get(col).keys).toEqual(['foo', 'bar']);
      expect(insert.at(col, 1, a)).toBe(col);
      expect(cache.get(col).keys).toEqual(['foo', 'baz', 'bar']);
      expect(insert.at(col, 1, b)).toBe(col);
      expect(cache.get(col).keys).toEqual(['foo', 'baz', 'bar']);
      expect(insert.at(col, 4, { id: 'foo', data: 22 })).toBe(col);
      expect(cache.get(col).keys).toEqual(['foo', 'baz', 'bar']);
      expect(col.foo.data).toBe(22);
    });

    it('should insert the given records at the specified index', () => {
      expect(cache.get(col).keys).toEqual(['foo', 'bar']);
      expect(insert.at(col, 0, a, b, { id: 'eggs', data: 2 })).toBe(col);
      expect(cache.get(col).keys).toEqual(['baz', 'eggs', 'foo', 'bar']);
    });
  });

  describe('insert.one.at()', () => {
    it('should insert a single record at the specified index', () => {
      expect(cache.get(col).keys).toEqual(['foo', 'bar']);
      expect(insert.one.at(col, 1, a)).toBe(col);
      expect(cache.get(col).keys).toEqual(['foo', 'baz', 'bar']);
      expect(insert.one.at(col, 1, b)).toBe(col);
      expect(cache.get(col).keys).toEqual(['foo', 'baz', 'bar']);
      expect(insert.one.at(col, 4, { id: 'foo', data: 22 })).toBe(col);
      expect(cache.get(col).keys).toEqual(['foo', 'baz', 'bar']);
      expect(insert.one.at(col, 4, { id: 'spam', data: 2 })).toBe(col);
      expect(cache.get(col).keys).toEqual(['foo', 'baz', 'bar', 'spam']);
      expect(col.spam.data).toBe(2);
    });
  });
});
