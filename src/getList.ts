import { Collection, IGenericRecord } from './types';
import cache from './cache';

/**
 * Get the order of collection IDs.
 *
 * @example
 * ```typescript
 *  const collection = Collection.create([{ id: 'foo' }, { id: 'bar' }, { id: 'baz' }]);
 *
 *  Collection.getList(collection); //-> [{ id: 'foo' }, { id: 'bar' }, { id: 'baz' }]
 * ```
 */
export default function getList<T extends IGenericRecord>(collection: Collection<T>): T[] {
  return cache.get(collection).keys.map((k) => collection[k]);
}
