import { Collection, IGenericRecord } from './types';
import cache from './cache';

/**
 * Get the order of collection IDs.
 * @example
 * ```typescript
 *  const collection = Collection.create([{ id: 'foo' }, { id: 'bar' }, { id: 'baz' }]);
 *
 *  Collection.getOrder(collection); //-> ['foo', 'bar', 'baz'];
 * ```
 */
export default function setOrder<T extends IGenericRecord>(collection: Collection<T>): Array<keyof typeof collection> {
  return cache.get(collection).keys.slice(0);
}
