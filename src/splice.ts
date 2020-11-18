import { Collection, IGenericRecord } from './types';
import cache from './cache';

/**
 * Concatenate two collections into a new, combined collection.
 * @example
 * ```typescript
 *  const collection = Collection.create([{ id: 'foo', data: 5 }, { id: 'baz', data: 0 }]);
 *
 *  console.log(Collection.splice(collection, 1, 1)); //-> [{ id: 'baz', data: 0 }]
 *  console.log(collection); //-> { foo: { id: 'foo', data: 5 } }
 * ```
 */
export default function splice<T extends IGenericRecord>(collection: Collection<T>, start = 0, count?: number): T[] {
  const keys = cache.get(collection).keys;

  return keys.splice(start, count ?? keys.length).map((k) => {
    const r = collection[k];

    delete collection[k];
    return r;
  });
}
