import { Collection, IGenericRecord } from './types';
import cache from './cache';

/**
 * Reverse the order of collection IDs.
 */
export default function reverse<T extends IGenericRecord>(collection: Collection<T>): typeof collection {
  cache.get(collection).keys.reverse();

  return collection;
}
