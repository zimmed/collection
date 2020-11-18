import { Collection } from './types';
import create from './create';
import concat from './concat';
import cache from './cache';

describe('concat()', () => {
  const obj = {
    foo: { id: 'foo', data: 5 },
    bar: { id: 'bar', data: 10 },
  };
  const arr = [
    { id: 'baz', data: 15 },
    { id: 'bar', data: 20 },
  ];
  let col1: Collection<{ id: string; data: number }>;
  let col2: Collection<{ id: string; data: number }>;
  let col3: Collection<{ id: string; data: number }>;

  beforeEach(() => {
    col1 = create(obj);
    col2 = create(arr);
  });

  afterEach(() => {
    cache.clear();
  });

  it('should concatenate two collection objects', () => {
    expect(() => cache.get(col1)).not.toThrowError();
    expect(() => cache.get(col2)).not.toThrowError();
    col3 = concat(col1, col2);
    expect(() => cache.get(col3)).not.toThrowError();
    expect(cache.get(col3).keys).toEqual(['foo', 'bar', 'baz']);
    expect(cache.get(col3).keys.length).toBe(3);
    expect(col3.bar?.data).toBe(20);
    expect(col1.bar?.data).toBe(10);
    expect(cache.get(col1).keys.length).toBe(2);
  });
});
