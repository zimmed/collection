export type ID = string | number;

export interface IGenericRecord {
  id: ID;
}

export type CollectionData<T = ID> = { keys: T[] };

export type CollectionMap<T extends IGenericRecord = IGenericRecord> = Record<string, T>;

export type CollectionArray<T extends IGenericRecord = IGenericRecord> = Array<T>;

export type Collection<T extends IGenericRecord = IGenericRecord> = CollectionMap<T>;

export type SortCompare<T> = (a: T, b: T) => 0 | 1 | -1;

export type SearchCompare<T> = (record: T) => 0 | 1 | -1;

export type ReduceCallback<T extends IGenericRecord, A = any> = (
  accum: A,
  record: T,
  i: number,
  ids: Array<KeyOf<Collection<T>>>
) => A;

export type FindPredicate<T extends IGenericRecord> = (record: T) => boolean;

export type IterateCallback<T extends IGenericRecord, A = any> = (
  record: T,
  i: number,
  ids: Array<KeyOf<Collection<T>>>
) => A;

export type KeyOf<C extends Collection> = C extends { [key: string]: any }
  ? string
  : C extends { [key: number]: { id: number } }
  ? number
  : never;
