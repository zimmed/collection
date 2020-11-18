import { Collection } from './types';
import create from './create';
import clone from './clone';
import cache from './cache';
import sort from './sort';

describe('clone()', () => {
  const obj = {
    foo: { id: 'foo', data: { v: 5, a: [1, 2] } },
    bar: { id: 'bar', data: { v: 10, a: [3, 4] } },
    baz: { id: 'baz', data: { v: 15, a: [5, 6] } },
  };
  let col: Collection<{ id: string; data: { v: number } }>;

  beforeEach(() => {
    col = create(obj);
  });

  afterEach(() => {
    cache.clear();
    obj.foo.data.v = 5;
  });

  it('it should create a shallow clone of the collection', () => {
    const copy = clone(col);

    expect(copy).toEqual(col);
    expect(copy).not.toBe(col);
    expect(copy.foo).toEqual(col.foo);
    expect(copy.foo).toBe(col.foo);
    expect(cache.get(copy).keys).toEqual(cache.get(col).keys);
    expect(cache.get(copy).keys).not.toBe(cache.get(col).keys);
    copy.foo.data.v = 50;
    expect(copy.foo.data.v).toBe(50);
    expect(col.foo.data.v).toBe(50);
    sort(copy);
    expect(cache.get(copy).keys).not.toEqual(cache.get(col).keys);
  });

  it('should have a `deep` method that creates a deep clone of the collection', () => {
    const copy = clone.deep(col);

    expect(copy).toEqual(col);
    expect(copy).not.toBe(col);
    expect(copy.foo).toEqual(col.foo);
    expect(copy.foo).not.toBe(col.foo);
    expect(cache.get(copy).keys).toEqual(cache.get(col).keys);
    expect(cache.get(copy).keys).not.toBe(cache.get(col).keys);
    copy.foo.data.v = 50;
    expect(copy.foo.data.v).toBe(50);
    expect(col.foo.data.v).toBe(5);
    sort(copy);
    expect(cache.get(copy).keys).not.toEqual(cache.get(col).keys);
  });
});
