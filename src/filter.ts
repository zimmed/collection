import { Collection, IGenericRecord, IterateCallback } from './types';
import cache from './cache';

/**
 * Filter records in collection and return new array.
 * @example
 * ```typescript
 *  const collection = Collection.create([{ id: 'foo', v: 100 }, { id: 'bar', v: 200 }, { id: 'baz', v: 3.14 }]);
 *  const filtered = Collection.filter(collection, (record, i, ids) => {
 *    ...
 *    return record.v > 100;
 *  });
 *
 *  console.log(filtered); //-> [{ id: 'bar', v: 200 }]
 * ```
 */
export default function filter<T extends IGenericRecord>(
  collection: Collection<T>,
  callback: IterateCallback<T, boolean>
): T[] {
  const keys = cache.get(collection).keys as Array<keyof typeof collection>;
  const l = keys.length;
  const out = [];
  let r;

  for (let i = 0; i < l; i++) {
    r = collection[keys[i]];
    if (callback(r, i, keys)) out.push(r);
  }
  return out;
}
