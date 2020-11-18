import { Collection, IGenericRecord } from './types';
import cache from './cache';
import { insertRecord } from './internals';

/**
 * Insert record into the front of the order.
 *
 * @example
 * ```typescript
 *  const collection = Collection.create([{id: 'foo'}]);
 *
 *  Collection.insert(Collection, { id: 'bar' }, { id: 'baz' });
 *  console.log(Array.from(Collection.iterate(collection))); //-> [{ id: 'bar' }, { id: 'baz' }, { id: 'foo' }]
 * ```
 */
export default function insert<T extends IGenericRecord>(collection: Collection<T>, ...records: T[]): Collection<T> {
  Array.prototype.unshift.apply(
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
 * Same as `insert` but optimized for single record insertion.
 *
 * @name insert.one
 */
function insertOne<T extends IGenericRecord>(collection: Collection<T>, record: T): Collection<T> {
  if (!collection[record.id]) {
    cache.get(collection).keys.unshift(record.id as keyof typeof collection);
  }
  collection[record.id] = record;
  return collection;
}

/**
 * Insert record into the ordered collection at the specified index
 *
 * @example
 * ```typescript
 *  const collection = Collection.create([{id: 'foo'}, {id: 'spam'}]);
 *
 *  Collection.insertAt(Collection, 1, { id: 'bar' }, { id: 'baz' });
 *  console.log(Array.from(Collection.iterate(collection))); //-> [{ id: 'foo' }, { id: 'bar' }, { id: 'baz' }, { id: 'spam' }]
 * ```
 *
 * @name insert.at
 */
function insertAt<T extends IGenericRecord>(collection: Collection<T>, index: number, ...records: T[]): Collection<T> {
  const data = cache.get(collection);

  records.reverse().forEach((record) => {
    insertRecord(collection, record, index, data);
  });

  return collection;
}

/**
 * Same as `insert.at` but optimized for single record insertion.
 *
 * @name insert.one.at
 */
function insertOneAt<T extends IGenericRecord>(collection: Collection<T>, index: number, record: T): Collection<T> {
  return insertRecord(collection, record, index);
}

insertOne.at = insertOneAt;
insert.one = insertOne;
insert.at = insertAt;
