import { Collection, IGenericRecord } from './types';
import cache from './cache';

/**
 * Pop the last ordered record from the collection.
 * @example
 * ```typescript
 *  const collection = Collection.create([{ id: 'foo', data: 5 }, { id: 'baz', data: 0 }]);
 *
 *  console.log(Collection.pop(collection)); //-> { id: 'baz', data: 0 }
 *  console.log(collection); //-> { foo: { id: 'foo', data: 5 } }
 * ```
 */
export default function pop<T extends IGenericRecord>(collection: Collection<T>): T | undefined {
  const data = cache.get(collection);
  const key = data.keys.pop();

  if (key) {
    const r = collection[key];

    delete collection[key as keyof typeof collection];
    return r;
  }

  return undefined;
}
