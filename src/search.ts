import { Collection, IGenericRecord, SearchCompare } from './types';
import cache from './cache';
import { sortedFindIndex } from './internals';

/**
 * Find record that matches given compare method
 *  Rather than searching in O(n) time using `find`, if the collection is already sorted, you can use
 *  this method to search in O(log n) time.
 *
 * @example
 * ```typescript
 *  const collection = Collection.create([{ id: 'foo', v: -1 }, { id: 'baz', v: 5 }, { id: 'bar', v: 10 }]);
 *
 *  console.log(Collection.search(collection, record => record.v < 5 ? 1 : record.v > 5 ? -1 : 0)); //-> { id: 'baz', v: 5 }
 *  // Note that looking for a non-specific match isn't gauranteed to find the first value that matches from the left,
 *  //  Although it will always return the same record for the same ordered collection.
 *  console.log(Collection.search(collection, record => record.v < 0 ? 1 : 0)); //-> { id: 'baz', v: 5 } | { id: 'bar', v: 10 }
 * ```
 */
export default function search<T extends IGenericRecord>(
  collection: Collection<T>,
  compare: SearchCompare<T>
): T | undefined {
  const data = cache.get(collection);
  const index = sortedFindIndex(data.keys, (key) => compare(collection[key]));

  return index === -1 ? undefined : collection[data.keys[index]];
}

/**
 * Find ordered index for record that matches given compare method.
 *  Like search, works in O(log n) time, but is not gauranteed to find the first match from the left if a non-specific
 *  match is provided.
 *
 * @example
 * ```typescript
 *  const collection = Collection.create([{ id: 'foo', v: -1 }, { id: 'baz', v: 5 }, { id: 'bar', v: 10 }]);
 *
 *  console.log(Collection.search.index(collection, record => record.v < 5 ? 1 : record.v > 5 ? -1 : 0)); //-> 1
 * ```
 *
 * @name search.index
 */
function searchIndex<T extends IGenericRecord>(collection: Collection<T>, compare: SearchCompare<T>): number {
  return sortedFindIndex(cache.get(collection).keys, (key) => compare(collection[key]));
}

search.index = searchIndex;
