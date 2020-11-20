import { Collection, IGenericRecord, IdOf } from './types';
import cache from './cache';

/**
 * Create a new collection from an id map (object), an array of objects, or an existing collection.
 * @example
 * ```typescript
 *  console.log(Collection.create()) //-> {}
 *  console.log(Collection.create([{ id: 'foo' }, { id: 'bar' }])); //-> { foo: { id: 'foo' }, bar: { id: 'bar' } }
 *  console.log(Collection.create({ foo: { id: 'foo' }, bar: { id: 'bar' } })); //-> { foo: { id: 'foo' }, bar: { id: 'bar' } }
 * ```
 */
export default function create<T extends IGenericRecord>(initial?: Collection<T> | T[]): Collection<T> {
  const collection =
    initial && Array.isArray(initial)
      ? initial.reduce((out: Collection<T>, value: T) => ({ ...out, [value.id]: value }), {})
      : initial
      ? { ...initial }
      : {};
  const keys = Object.keys(collection) as IdOf<T>[];

  cache.set(collection, { keys });
  return collection;
}
