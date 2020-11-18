import { Collection, IGenericRecord } from './types';
import cache from './cache';

export type UpdateCallback<T> = (record: T, i: number, ids: string[]) => Partial<T> | undefined;

/**
 * Map over and update records in collection.
 * @example
 * ```typescript
 *  const collection = Collection.create([{ id: 'foo', v: 100 }, { id: 'bar', v: 200 }, { id: 'baz', v: 3.14 }]);
 *
 *  Collection.update(collection, (record, i, ids) => {
 *    ...
 *    { v: record.v * 10 };
 *  });
 *
 *  console.log(collection.baz.v); //-> 31.4
 * ```
 */
export default function update<T extends IGenericRecord>(
  collection: Collection<T>,
  callback: UpdateCallback<T>
): typeof collection {
  const keys = cache.get(collection).keys;
  const l = keys.length;

  for (let i = 0; i < l; i++) {
    const r = collection[keys[i]];

    Object.assign(r, callback(r, i, keys));
  }
  return collection;
}
