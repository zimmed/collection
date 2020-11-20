import { Collection, IGenericRecord, IdOf } from './types';
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
  const { keys } = cache.get(collection);
  const add: IdOf<T>[] = [];

  for (let i = 0, l = records.length; i < l; i++) {
    const { id } = records[i];

    if (!collection[id]) add.push(id as IdOf<T>);
    collection[id] = records[i];
  }
  Array.prototype.unshift.apply(keys, add);

  return collection;
}

/**
 * Same as `insert` but optimized for single record insertion.
 *
 * @name insert.one
 */
function insertOne<T extends IGenericRecord>(collection: Collection<T>, record: T): Collection<T> {
  return insertRecord(collection, record);
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
  const { keys } = cache.get(collection);
  const add: IdOf<T>[] = [];

  for (let i = 0, l = records.length; i < l; i++) {
    const { id } = records[i];

    if (!collection[id]) add.push(id as IdOf<T>);
    collection[id] = records[i];
  }

  const count = add.length;

  if (count) {
    keys.length += count;
    for (let i = keys.length - 1, l = index + count; i >= l; i--) {
      keys[i] = keys[i - count];
    }
    for (let i = 0; i < count; i++) {
      keys[index + i] = add[i];
    }
  }

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
