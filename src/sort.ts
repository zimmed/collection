import { Collection, IGenericRecord } from './types';
import cache from './cache';

/**
 * Sort the order of records in the collection with the specified compare function.
 * If no compare function specified, will sort by ID in ascending alphabetical order.
 * @example
 * ```typescript
 *  const collection = Collection.create([{ id: 'foo', num: 7 }, { id: 'bar', num: 10 }, { id: 'baz', num: 1 }]);
 *
 *  Collection.sort(collection, (a, b) => a.num < b.num ? -1 : a.num > b.num ? 1 : 0);
 *  console.log(Array.from(Collection.iterate(collection))); //-> [{ id: 'baz', num: 1 }, { id: 'foo', num: 7 }, { id: 'bar', num: 10 }]
 * ```
 */
export default function sort<T extends IGenericRecord>(
  collection: Collection<T>,
  compare?: (a: T, b: T) => 0 | -1 | 1
): typeof collection {
  const cmp = compare
    ? (a: keyof typeof collection, b: keyof typeof collection) => compare(collection[a], collection[b])
    : undefined;

  cache.get(collection).keys.sort(cmp);
  return collection;
}
