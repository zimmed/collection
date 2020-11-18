import { Collection, IGenericRecord } from './types';
import cache from './cache';

/**
 * Get the record at the specified ordered index.
 * @example
 * ```typescript
 *  const collection = Collection.create([{ id: 'foo' }, { id: 'baz' }, { id: 'bar' }]);
 *
 *  console.log(Collection.at(collection, 1)); //-> { id: 'baz' }
 * ```
 */
export default function at<T extends IGenericRecord>(collection: Collection<T>, index: number): T | undefined {
  return collection[cache.get(collection).keys[index]];
}
