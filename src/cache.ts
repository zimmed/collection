import { Collection, CollectionData, KeyOf } from './types';

/** @internal */
let cache = new WeakMap<Collection, CollectionData>();

/** @internal */
export default {
  getInstance(): WeakMap<Collection, CollectionData> {
    return cache;
  },

  get<T extends Collection>(collection: T): CollectionData<KeyOf<T>> {
    const data = cache.get(collection) as CollectionData<KeyOf<T>>;

    if (!data) {
      throw new Error('No private data exists for collection');
    }
    return data;
  },

  set<T extends Collection>(collection: T, data: CollectionData<keyof typeof collection>): void {
    cache.set(collection, data as CollectionData);
  },

  del<T extends Collection>(collection: T): void {
    cache.delete(collection);
  },

  clear(): void {
    cache = new WeakMap<Collection, CollectionData>();
  },
};
