import { Collection, IGenericRecord, FindPredicate } from './types';
import cache from './cache';

/**
 * Find record that matches given predicate.
 * @example
 * ```typescript
 *  const collection = Collection.create([{ id: 'foo', v: -1 }, { id: 'baz', v: 5 }, { id: 'bar', v: 10 }]);
 *
 *  console.log(Collection.find(collection, record => record.v > 0)); //-> { id: 'baz', v: 5 }
 * ```
 */
export default function find<T extends IGenericRecord>(
  collection: Collection<T>,
  predicate: FindPredicate<T>
): T | undefined {
  const data = cache.get(collection);
  const key = data.keys.find((k) => predicate(collection[k]));

  return key ? collection[key] : undefined;
}

/**
 * Find ordered index for record that matches given predicate.
 *
 * @example
 * ```typescript
 *  const collection = Collection.create([{ id: 'foo', v: -1 }, { id: 'baz', v: 5 }, { id: 'bar', v: 10 }]);
 *
 *  console.log(Collection.find.index(collection, record => record.v > 0)); //-> 1
 * ```
 *
 * @name find.index
 */
function findIndex<T extends IGenericRecord>(collection: Collection<T>, predicate: FindPredicate<T>): number {
  const data = cache.get(collection);

  return data.keys.findIndex((k) => predicate(collection[k]));
}

find.index = findIndex;
