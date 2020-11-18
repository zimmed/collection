import { Collection, IGenericRecord } from './types';
import cache from './cache';
import { cloneValue } from './internals';

/**
 * Clone an existing collection
 * @example
 * ```typescript
 *  const collection = Collection.create([{ id: 'foo', data: 5 }, { id: 'baz', data: 0 }]);
 *  const copy = Collection.clone(collection);
 *  const deep = Collection.clone.deep(collection);
 *
 *  console.log(collection.baz === copy.baz); //-> true
 *  console.log(collection.baz === deep.baz); //-> false
 * ```
 */
export default function clone<T extends IGenericRecord>(col: Collection<T>): Collection<T> {
  const collection = { ...col };
  const keys = cache.get(col).keys.slice(0);

  cache.set(collection, { keys });
  return collection;
}

/**
 * Clone an existing collection as well as the records.
 *
 * @name clone.deep
 */
function cloneDeep<T extends IGenericRecord>(col: Collection<T>): Collection<T> {
  const keys = cache.get(col).keys.slice(0);
  const collection = keys.reduce((next, key) => {
    next[key] = cloneValue(col[key]);
    return next;
  }, {} as Collection<T>);

  cache.set(collection, { keys });
  return collection;
}

clone.deep = cloneDeep;
