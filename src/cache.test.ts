import { Collection, CollectionData } from './types';
import cache from './cache';

describe('cache', () => {
  const o: Collection<{ id: string }> = {};
  const o2: Collection = { foo: { id: 'foo' } };
  const d: CollectionData<string> = { keys: [] };
  const d2: CollectionData<string> = { keys: ['foo'] };

  afterEach(() => {
    cache.clear();
  });

  describe('getInstance()', () => {
    it('should be a WeakMap', () => {
      expect(cache.getInstance()).toBeInstanceOf(WeakMap);
    });
  });

  describe('get/set', () => {
    it('should get the data associated with the lookup object instance', () => {
      expect(() => cache.get(o)).toThrowError();
      expect(cache.set(o, d)).toBeUndefined();
      expect(() => cache.get({})).toThrowError();
      expect(cache.get(o)).toBe(d);
    });
  });

  describe('del', () => {
    beforeEach(() => {
      cache.set(o, d);
      cache.set(o2, d2);
    });

    it('should clear the associated data', () => {
      expect(cache.get(o)).toBe(d);
      expect(cache.del(o)).toBeUndefined();
      expect(() => cache.get(o)).toThrowError();
    });
  });
});
