import { Collection, IGenericRecord } from './types';
import cache from './cache';

/**
 * Shift/dequeue the first ordered record from the collection.
 * @example
 * ```typescript
 *  const collection = Collection.create([{ id: 'foo', data: 5 }, { id: 'baz', data: 0 }]);
 *
 *  console.log(Collection.shift(collection)); //-> { id: 'foo', data: 5 }
 *  console.log(collection); //-> { baz: { id: 'baz', data: 0 } }
 * ```
 */
export default function shift<T extends IGenericRecord>(collection: Collection<T>): T | undefined {
  const data = cache.get(collection);
  const key = data.keys.shift();

  if (key) {
    const r = collection[key];

    delete collection[key as keyof typeof collection];
    return r;
  }

  return undefined;
}
