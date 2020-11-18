import { Collection, IGenericRecord } from './types';
import cache from './cache';

/**
 * Get the number of items in the collection.
 * @example
 * ```typescript
 *  const collection = Collection.create([{ id: 'foo' }, { id: 'bar' }, { id: 'baz' }]);
 *
 *  Collection.length(collection); //-> 3
 * ```
 */
export default function length<T extends IGenericRecord>(collection: Collection<T>): number {
  return cache.get(collection).keys.length;
}
