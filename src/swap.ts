import { Collection, IGenericRecord, IdOf } from './types';
import cache from './cache';
import { moveKey } from './internals';

/**
 * Pick record by id and insert it into the index provided.
 *
 * Note: Because the function squashes the empty space left by the pick, if the specified index is greater than the starting index,
 * the final index of the record will be the specified index - 1.
 *
 * @name swap.with
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
export default function swap<T extends IGenericRecord>(
  collection: Collection<T>,
  a: T['id'],
  b: T['id']
): Collection<T> {
  const { keys } = cache.get(collection);
  const x = keys.indexOf(a as IdOf<T>);
  const y = keys.indexOf(b as IdOf<T>);
  let t: IdOf<T>;

  if (x !== -1 && y !== -1) {
    t = keys[x];
    keys[x] = keys[y];
    keys[y] = t;
  }

  return collection;
}

/**
 * Same as `swap` but swaps record with provided index
 *
 * @name swap.with.index
 */
function swapIndex<T extends IGenericRecord>(collection: Collection<T>, a: T['id'], y: number): Collection<T> {
  const { keys } = cache.get(collection);
  if (y < 0 || y >= keys.length) return moveKey(collection, a, y, keys);

  const x = keys.indexOf(a as IdOf<T>);
  let t: IdOf<T>;

  if (x !== -1) {
    t = keys[x];
    keys[x] = keys[y];
    keys[y] = t;
  }

  return collection;
}

/**
 * Same as `swap` but swaps record at given index with provided ID
 *
 * @name swap.at.with
 */
function swapAt<T extends IGenericRecord>(collection: Collection<T>, x: number, b: T['id']): Collection<T> {
  const { keys } = cache.get(collection);
  const y = keys.indexOf(b as IdOf<T>);
  let t: IdOf<T>;

  if (keys[x] && y !== -1) {
    t = keys[x];
    keys[x] = keys[y];
    keys[y] = t;
  }

  return collection;
}

/**
 * Same as `swap` but swaps record at given index with provided ID
 *
 * @name swap.at.with.index
 */
function swapAtIndex<T extends IGenericRecord>(collection: Collection<T>, x: number, y: number): Collection<T> {
  const { keys } = cache.get(collection);
  if (y < 0 || y >= keys.length) return moveKey(collection, keys[x], y, keys);
  let t: IdOf<T>;

  if (keys[x] && y !== -1) {
    t = keys[x];
    keys[x] = keys[y];
    keys[y] = t;
  }

  return collection;
}

swapAt.index = swapAtIndex;
swapAt.with = swapAt;
swap.index = swapIndex;
swap.at = swapAt;
