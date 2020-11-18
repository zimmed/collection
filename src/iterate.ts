import { Collection, IGenericRecord } from './types';
import cache from './cache';

export interface IIterator<T> {
  next: () => { value: T } | { done: true };
}

export type Iterable<T> = {
  length: number;
  [Symbol.iterator]: () => IIterator<T>;
};

/**
 * Get an iterator for the ordered collection.
 * @example
 * ```typescript
 *  const collection = Collection.create([{ id: 'foo' }, { id: 'bar' }, { id: 'baz' }]);
 *  const recordArray = Array.from(Collection.iterate(collection));
 *
 *  // Or
 *  for (const record of Collection.iterate(collection)) {
 *      ...
 *  }
 * ```
 */
export default function iterate<T extends IGenericRecord>(collection: Collection<T>): Iterable<T> {
  const keys = cache.get(collection).keys.slice(0);
  const length = keys.length;
  let i = 0;

  return {
    length,
    [Symbol.iterator]: () => ({
      // eslint-disable-next-line no-plusplus
      next: () => (keys[i] ? { value: collection[keys[i++]] } : { done: true }),
    }),
  };
}
