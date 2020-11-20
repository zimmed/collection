import { Collection, IGenericRecord } from './types';
import cache from './cache';
import { moveKey } from './internals';

/**
 * Pick record by id and insert it into the index provided.
 *
 * Note: Because the function squashes the empty space left by the pick, if the specified index is greater than the starting index,
 * the final index of the record will be the specified index - 1.
 *
 * @example
 * ```typescript
 *  const collection = Collection.create([{ id: 'foo', num: 1 }, { id: 'bar', num: 5 }, { id: 'baz', num: 10 }]);
 *
 *  Collection.move(collection, 'foo', 2);
 *  console.log(Collection.getList(collection)); //-> [{ id: 'bar', num: 5 }, { id: 'foo', num: 1 }, { id: 'baz', num: 10 }]
 *  Collection.move(collection, 'baz', 1);
 *  console.log(Collection.getList(collection)); //-> [{ id: 'bar', num: 5 }, { id: 'baz', num: 10 }, { id: 'foo', num: 1 }]
 * ```
 */
export default function move<T extends IGenericRecord>(
  collection: Collection<T>,
  id: T['id'],
  index: number
): Collection<T> {
  return moveKey(collection, id, index);
}

/**
 * Same as `move` but moves record at first index to second index.
 *
 * @name move.at
 */
function moveAt<T extends IGenericRecord>(collection: Collection<T>, from: number, to: number): Collection<T> {
  const { keys } = cache.get(collection);

  return moveKey(collection, keys[from], to, keys);
}

move.at = moveAt;
