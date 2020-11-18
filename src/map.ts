import { Collection, IGenericRecord, IterateCallback } from './types';
import cache from './cache';

/**
 * Map over records in collection and return new array.
 * @example
 * ```typescript
 *  const collection = Collection.create([{ id: 'foo', v: 100 }, { id: 'bar', v: 200 }, { id: 'baz', v: 3.14 }]);
 *  const recordValues = Collection.map(collection, (record, i, ids) => {
 *    ...
 *    return record.v;
 *  });
 *
 *  console.log(recordValues); //-> [100, 200, 3.14]
 * ```
 */
export default function map<T extends IGenericRecord, A = any>(
  collection: Collection<T>,
  callback: IterateCallback<T, A>
): A[] {
  const keys = cache.get(collection).keys;
  const l = keys.length;
  const out = Array(l);

  for (let i = 0; i < l; i++) out[i] = callback(collection[keys[i]], i, keys);
  return out;
}
