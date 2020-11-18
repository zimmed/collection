import { Collection, IGenericRecord, SortCompare } from './types';
import cache from './cache';
import { insertionSort } from './internals';

/**
 * Insertion sort: insert record into sorted order using the specified compare function, or the default, alphabetical ID sort.
 *
 * @example
 * ```typescript
 *  const collection = Collection.create([{ id: 'foo', num: 1 }, { id: 'bar', num: 5 }, { id: 'baz', num: 10 }]);
 *
 *  Collection.sortInsert(collection, { id: 'eggs', num: 11 }, { id: 'spam', num: 2.3 }, (a, b) => a.num > b.num ? -1 : a.num < b.num ? 1 : 0);
 *  console.log(Array.from(Collection.iterate(collection))); //-> [
 *    { id: 'baz', num: 1 },
 *    { id: 'spam', num: 2.3 },
 *    { id: 'foo', num: 7 },
 *    { id: 'bar', num: 10 },
 *    { id: 'eggs', num: 11 },
 *  ]
 * ```
 */
export default function sortedInsert<T extends IGenericRecord>(
  collection: Collection<T>,
  ...args: Array<T | SortCompare<T>>
): Collection<T> {
  const compare = typeof args[args.length - 1] === 'function' ? (args.splice(-1)[0] as SortCompare<T>) : undefined;
  const records = args as T[];
  const data = cache.get(collection);
  const cmp: (r: T) => SortCompare<keyof typeof collection> | undefined = (r) =>
    compare && ((_, b) => compare(r, collection[b]));

  records.forEach((record) => {
    insertionSort(collection, record, cmp(record), data);
  });

  return collection;
}

/**
 * Same as `sortInsert` but optimized for inserting one record at a time.
 *
 * @name sortedInsert.one
 */
function one<T extends IGenericRecord>(collection: Collection<T>, record: T, compare?: SortCompare<T>): Collection<T> {
  const cmp: (r: T) => SortCompare<keyof typeof collection> | undefined = (r) =>
    compare && ((_, b) => compare(r, collection[b]));

  return insertionSort(collection, record, cmp(record));
}

sortedInsert.one = one;
