import { Collection, IGenericRecord, FindPredicate } from './types';
import cache from './cache';

/**
 * Remove the specified IDs from the collection and return the associated records.
 *
 * @example
 * ```typescript
 *  const collection = Collection.create([{ id: 'foo' }, { id: 'baz' }, { id: 'bar' }]);
 *
 *  console.log(Collection.remove(collection, 'foo', 'bar')); //-> [{ id: 'foo' }, { id: 'bar' }]
 *  console.log(collection); //-> { baz: { id: 'baz' } }
 * ```
 */
export default function remove<T extends IGenericRecord>(
  collection: Collection<T>,
  ...recordIds: Array<keyof typeof collection>
): T[] {
  let idx;
  let r;
  const data = cache.get(collection);

  return recordIds.reduce((arr: T[], id: keyof typeof collection) => {
    r = collection[id];
    if (r) {
      idx = data.keys.indexOf(id);
      data.keys.splice(idx, 1);
      delete collection[id];
      return arr.concat(r);
    }
    return arr;
  }, []);
}

/**
 * Same as `remove` but optimized to handle a single record ID at a time.
 *
 * @name remove.one
 */
function removeOne<T extends IGenericRecord>(
  collection: Collection<T>,
  recordId: keyof typeof collection
): undefined | T {
  const r = collection[recordId];

  if (r) {
    const data = cache.get(collection);
    const idx = data.keys.indexOf(recordId);

    data.keys.splice(idx, 1);
    delete collection[recordId];
  }
  return r;
}

/**
 * Remove the matching records from the collection and return them.
 *
 * @example
 * ```typescript
 *  const collection = Collection.create([{ id: 'foo', v: 1 }, { id: 'baz', v: 2 }, { id: 'bar', v: 3 }]);
 *
 *  console.log(Collection.remove.by(collection, r => r.v > 1)); //-> [{ id: 'baz', v: 2 }, { id: 'bar', v: 3 }]
 *  console.log(collection); //-> { foo: { id: 'foo', v: 1 } }
 * ```
 *
 * @name remove.by
 */
function removeBy<T extends IGenericRecord>(collection: Collection<T>, predicate: FindPredicate<T>): T[] {
  const data = cache.get(collection);
  const removed = [];
  let r;

  for (let i = 0, l = data.keys.length; i < l; i++) {
    r = collection[data.keys[i]];
    if (predicate(r)) {
      removed.push(r);
      delete collection[data.keys[i]];
      data.keys.splice(i, 1);
      i -= 1;
      l -= 1;
    }
  }

  return removed;
}

/**
 * Remove the record at the specified ordered index and return it.
 *
 * @example
 * ```typescript
 *  const collection = Collection.create([{ id: 'foo' }, { id: 'baz' }, { id: 'bar' }]);
 *
 *  console.log(Collection.remove.at(collection, 1)); //-> { id: 'baz' }
 *  console.log(collection); //-> { foo: { id: 'foo' }, bar: { id: 'bar' } }
 * ```
 *
 * @name remove.at
 */
function removeAt<T extends IGenericRecord>(collection: Collection<T>, index: number): T | undefined {
  const data = cache.get(collection);
  const key = data.keys.splice(index, 1)[0];
  const r = collection[key];

  delete collection[key];
  return r;
}

remove.at = removeAt;
remove.one = removeOne;
remove.by = removeBy;
