import { Collection, IGenericRecord } from './types';
import cache from './cache';

/**
 * Concatenate two collections into a new, combined collection.
 * @example
 * ```typescript
 *  const a = Collection.create([{ id: 'foo', data: 5 }, { id: 'baz', data: 0 }]);
 *  const b = Collection.create([{ id: 'bar', data: 17 }, { id: 'foo', data: 25 }]);
 *  const c = Collection.concat(a, b);
 *
 *  console.log(Array.from(Collection.iterate(c))); //-> [{ id: 'foo', data: 25 }, { id: 'baz', data: 0 }, { id: 'bar', data: 17 }]
 * ```
 */
export default function concat<T extends IGenericRecord>(col1: Collection<T>, col2: Collection<T>): Collection<T> {
  const collection = { ...col1 };
  const keys = cache.get(col1).keys.slice(0);

  cache.get(col2).keys.forEach((key) => {
    if (!collection[key]) {
      keys.push(key);
    }
    collection[key] = col2[key];
  });
  cache.set(collection, { keys });
  return collection;
}
