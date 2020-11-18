import create from './create';
import cache from './cache';

describe('create()', () => {
  const obj = {
    foo: { id: 'foo', data: 5 },
    bar: { id: 'bar', data: 10 },
  };
  const arr = [
    { id: 'foo', data: 5 },
    { id: 'bar', data: 10 },
  ];

  afterEach(() => {
    cache.clear();
  });

  it('should create a new default collection object', () => {
    const col = create();

    expect(col).toEqual({});
    expect(() => cache.get(col)).not.toThrowError();
    expect(cache.get(col).keys).toEqual([]);
  });

  it('should create a collection from a pre-existing object-id map', () => {
    const col = create(obj);

    expect(col).toEqual(obj);
    expect(() => cache.get(col)).not.toThrowError();
    expect(cache.get(col).keys).toEqual(['foo', 'bar']);
  });

  it('should create a collection from a pre-existing array of objects', () => {
    const col = create(arr);

    expect(col).toEqual(obj);
    expect(() => cache.get(col)).not.toThrowError();
    expect(cache.get(col).keys).toEqual(['foo', 'bar']);
  });
});
