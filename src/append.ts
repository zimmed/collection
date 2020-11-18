import { Collection, IGenericRecord, KeyOf } from './types';
import cache from './cache';

/**
 * Push records to the end of the collection.
 *
 * @example
 * ```typescript
 *  const collection = Collection.create();
 *
 *  console.log(Collection.length(collection)) //-> 0
 *  Collection.append(collection, { id: 'foobar', foo: 5 }, { id: 'bazbaz', foo: 10 });
 *  console.log(collection); //-> { foobar: { id: 'foobar', foo: 5 }, bazbaz: { id: 'bazbaz', foo: 10 } }
 *  console.log(Collection.length(collection)) //-> 2
 * ```
 */
export default function append<T extends IGenericRecord>(collection: Collection<T>, ...records: T[]): Collection<T> {
  Array.prototype.push.apply(
    cache.get(collection).keys,
    records.reduce((next, record) => {
      if (!collection[record.id]) {
        next.push(record.id as keyof typeof collection);
      }
      collection[record.id] = record;
      return next;
    }, [] as Array<keyof typeof collection>)
  );

  return collection;
}

/**
 * Same as `append` but performance-optimized for single record pushing.
 *
 * @name append.one
 */
function appendOne<T extends IGenericRecord>(collection: Collection<T>, record: T): Collection<T> {
  if (!collection[record.id]) {
    cache.get(collection).keys.push(record.id as KeyOf<typeof collection>);
  }
  collection[record.id] = record;
  return collection;
}

append.one = appendOne;
