import { Collection } from './types';
import create from './create';
import at from './at';
import cache from './cache';

describe('at()', () => {
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

  it('should remove an existing record by index and return it', () => {
    expect(at(col, 0)).toEqual({ id: 'foo', data: 5 });
    expect(at(col, 1)).toEqual({ id: 'bar', data: 10 });
  });

  it('should return undefined if record does not exist', () => {
    expect(at(col, 3)).toBeUndefined();
  });
});
