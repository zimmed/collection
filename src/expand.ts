import { Collection, IGenericRecord, TransformTypes, GetTypeMap, CollectionEntryMap, Obj } from './types';
import cache from './cache';
import { expandValues } from './internals';

/**
 * Updates the collection by expanding ID references with their collection records.
 *
 * Note: Because this method mutates the records themselves, it can track records that have already
 * been expanded. Thus, unlike `Collection.join`, `Collection.expand` can be used with circular
 * references, safely.
 *
 * @param base The collection to expand
 * @param collections A map of property names to their associated collection (see README.md for more info)
 * @returns The original (now expanded) Collection.
 * @example
 * ```typescript
 * const ays = Collection.create([{ id: 'foo', bees: ['a'], cee: 1 }, { id: 'bar', bees: ['a', 'b'], cee: 2 }]);
 * const bees = Collection.create([{ id: 'a', value: 10, cee: 3 }, { id: 'b', value: 20, cee: 3 }, { id: 'c', value: 40, cee: 3 }]);
 * const cees = Collection.create([{ id: 1 }, { id: 2 }, { id: 3 }]);
 *
 * const expanded = Collection.expand(ays, { bees: [bees], cee: cees });
 * console.log(expanded === ays); //-> true
 * console.log(expanded); //-> {
 * //   id: 'bar',
 * //   bees: [{ id: 'a', value: 10, cee: { id: 3 } }, { id: 'b', value: 20, cee: { id: 3 } }],
 * //   cee: { id: 2 } },
 * // }
 * ```
 */
export default function expand<T extends IGenericRecord, M extends CollectionEntryMap>(
  base: Collection<T>,
  collections: M
): Collection<Obj<{ id: T['id'] } & TransformTypes<T, GetTypeMap<typeof collections>>>> {
  const expanded = new WeakMap();
  const keys = cache.get(base).keys;

  for (let i = 0, l = keys.length; i < l; i++) {
    expandValues(base[keys[i]], collections, true, expanded);
  }
  return base as Collection<Obj<{ id: T['id'] } & TransformTypes<T, GetTypeMap<typeof collections>>>>;
}
