import { Collection, IGenericRecord, IdOf } from './types';
import cache from './cache';

/**
 * Set the order of the collection from the specified array of IDs.
 * @example
 * ```typescript
 *  const collection = Collection.create([{ id: 'foo' }, { id: 'bar' }, { id: 'baz' }]);
 *
 *  Collection.setOrder(collection, ['baz', 'bar', 'foo']);
 *  console.log(Array.from(Collection.iterate(collection))); //-> [{ id: 'baz' }, { id: 'bar' }, { id: 'foo' }]
 * ```
 */
export default function setOrder<T extends IGenericRecord>(
  collection: Collection<T>,
  keys: Array<keyof typeof collection>
): typeof collection {
  const data = cache.get(collection);
  const last = data.keys.slice(0) as IdOf<T>[];
  let cur = 0;
  let index;

  for (let i = 0, l = keys.length; i < l; i++) {
    index = last.indexOf(keys[i] as IdOf<T>);
    if (index !== -1) {
      (data.keys as IdOf<T>[])[cur] = last.splice(index, 1)[0];
      cur += 1;
    }
  }
  for (let i = 0, l = last.length; i < l; i++) {
    (data.keys as IdOf<T>[])[cur] = last[i];
    cur += 1;
  }

  return collection;
}
