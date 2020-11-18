import { Collection, IGenericRecord, ReduceCallback } from './types';
import cache from './cache';

/**
 * Reduce records in collection
 * @example
 * ```typescript
 *  const collection = Collection.create([{ id: 'foo', v: 100 }, { id: 'bar', v: 200 }, { id: 'baz', v: 3.14 }]);
 *  const total = Collection.reduce(collection, (accum, record, i, ids) => {
 *    ...
 *    return accum + record.v;
 *  }, 0);
 *
 *  console.log(total); //-> 303.14
 * ```
 */
export default function reduce<T extends IGenericRecord, A = any>(
  collection: Collection<T>,
  callback: ReduceCallback<T, A>,
  initialValue: A
): A {
  const keys = cache.get(collection).keys;
  const l = keys.length;
  let accum = initialValue;

  for (let i = 0; i < l; i++) accum = callback(accum, collection[keys[i]], i, keys);
  return accum;
}

/**
 * Same as `reduce` but starts at end of ordered collection, working backwards.
 */
reduce.right = function reduceRight<T extends IGenericRecord, A = any>(
  collection: Collection<T>,
  callback: ReduceCallback<T, A>,
  initialValue: A
): A {
  const keys = cache.get(collection).keys;
  const l = keys.length;
  let accum = initialValue;

  for (let i = l - 1; i >= 0; i--) accum = callback(accum, collection[keys[i]], i, keys);
  return accum;
};
