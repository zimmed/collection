import { Collection, IGenericRecord, TransformTypes, GetTypeMap, CollectionEntryMap } from './types';
import map from './map';
import { expandValues } from './internals';

/**
 * Returns array of collection records with id refs replaced by the actual records.
 *
 * Note: This function does not check for recursive structures and will attempt to
 * resolve references until it hits a process memory overflow, so use it with caution.
 *
 * @param base The collection records to expand
 * @param collections A map of property names to their associated collection (see README.md for more info)
 * @returns Ordered array of joined records
 * @example
 * ```typescript
 * const ays = Collection.create([{ id: 'foo', bees: ['a'], cee: 1 }, { id: 'bar', bees: ['a', 'b'], cee: 2 }]);
 * const bees = Collection.create([{ id: 'a', value: 10, cee: 3 }, { id: 'b', value: 20, cee: 3 }, { id: 'c', value: 40, cee: 3 }]);
 * const cees = Collection.create([{ id: 1 }, { id: 2 }, { id: 3 }]);
 *
 * const joinedAys = Collection.join(ays, { bees: [bees], cee: cees });
 * console.log(joinedAys[1]); //-> {
 * //   id: 'bar',
 * //   bees: [{ id: 'a', value: 10, cee: { id: 3 } }, { id: 'b', value: 20, cee: { id: 3 } }],
 * //   cee: { id: 2 } },
 * // }
 * ```
 */
export default function join<T extends IGenericRecord, M extends CollectionEntryMap>(
  base: Collection<T>,
  collections: M
): TransformTypes<T, GetTypeMap<typeof collections>>[] {
  return map(base, (record) => expandValues(record, collections));
}
