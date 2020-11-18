import { Collection, IGenericRecord } from './types';
import cache from './cache';

/**
 * Concatenate two collections into a new, combined collection.
 * @example
 * ```typescript
 *  const collection = Collection.create([{ id: 'foo', data: 5 }, { id: 'baz', data: 0 }]);
 *
 *  console.log(Collection.slice(collection, 1, 1)); //-> [{ id: 'baz', data: 0 }]
 *  console.log(collection); //-> { foo: { id: 'foo', data: 5 }, baz: { id: 'baz', data: 0 } }
 * ```
 */
export default function slice<T extends IGenericRecord>(collection: Collection<T>, start = 0, end?: number): T[] {
  return cache
    .get(collection)
    .keys.slice(start, end)
    .map((k) => collection[k]);
}
