import { Collection, IGenericRecord, IterateCallback } from './types';
import cache from './cache';

/**
 * Iterate over collection items using forEach syntax.
 * @example
 * ```typescript
 *  const collection = Collection.create([{ id: 'foo' }, { id: 'bar' }, { id: 'baz' }]);
 *
 *  Collection.forEach(collection, (record, i, ids) => {
 *    ...
 *  });
 * ```
 */
export default function forEach<T extends IGenericRecord>(
  collection: Collection<T>,
  callback: IterateCallback<T, void>
): void {
  const keys = cache.get(collection).keys;
  const l = keys.length;

  for (let i = 0; i < l; i++) callback(collection[keys[i]], i, keys);
}
