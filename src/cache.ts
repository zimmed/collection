import { Collection, IGenericRecord, CollectionData, IdOf, ID } from './types';

/** @internal */
let cache = new WeakMap<Collection, CollectionData<ID>>();

/** @internal */
export default {
  getInstance(): WeakMap<Collection, CollectionData<ID>> {
    return cache;
  },

  get<T extends IGenericRecord>(collection: Collection<T>): CollectionData<IdOf<T>> {
    const data = cache.get(collection) as CollectionData<IdOf<T>>;

    if (!data) {
      throw new Error('No private data exists for collection');
    }
    return data;
  },

  set<T extends IGenericRecord>(collection: Collection<T>, data: CollectionData<IdOf<T>>): void {
    cache.set(collection, data as CollectionData<IdOf<T>>);
  },

  del<T extends IGenericRecord>(collection: Collection<T>): void {
    cache.delete(collection);
  },

  clear(): void {
    cache = new WeakMap<Collection, CollectionData<ID>>();
  },
};
