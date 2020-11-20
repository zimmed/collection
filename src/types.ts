/* eslint-disable @typescript-eslint/ban-types */
export type ID = string | number;

export interface IGenericRecord {
  id: ID;
}

export type CollectionData<T> = { keys: T[] };

export type Collection<T extends IGenericRecord = IGenericRecord> = Record<IGenericRecord['id'], T>;

export type ReduceCallback<T extends IGenericRecord, A = any> = (
  accum: A,
  record: T,
  i: number,
  ids: Array<IdOf<T>>
) => A;

export type IterateCallback<T extends IGenericRecord, A = any> = (record: T, i: number, ids: Array<IdOf<T>>) => A;

export type SortCompare<T> = (a: T, b: T) => 0 | 1 | -1;

export type SearchCompare<T> = (record: T) => 0 | 1 | -1;

export type FindPredicate<T extends IGenericRecord> = (record: T) => boolean;

export type IdOf<T> = T extends { id: infer I } ? I : never;

export type KeyOf<C extends Collection> = C extends { [key: string]: any }
  ? string
  : C extends { [key: number]: { id: number } }
  ? number
  : never;

export type Ref<N extends string, T extends IGenericRecord> = T extends { id: infer I } ? { name: N; id: I } : never;

export type RefForCollection<N extends string, C> = C extends Collection<infer T> ? Ref<N, T> : never;

export type UnionToIntersection<U> = (U extends any ? (k: U) => void : never) extends (k: infer I) => void ? I : never;

/** @internal */
type MapTypesHelper<T, K extends keyof T, M extends object> = K extends keyof M
  ? Pick<T, K> extends Required<Pick<T, K>>
    ? { [P in K]: M[K] extends Array<any> ? TransformedValue<M[K], P, M> : TransformedValue<M[K], P, M> | undefined }
    : { [P in K]?: TransformedValue<M[K], P, M> }
  : {
      [P in K]: T[P];
    };

/** @internal */
export type Obj<T> = {} & { [K in keyof T]: T[K] };

/** @internal */
type MapTypes<T, M extends object> = Obj<UnionToIntersection<MapTypesHelper<T, keyof T, M>>>;

/** @internal */
type TransformedValue<T, P, KeyMap extends object> = T extends Array<infer E>
  ? TransformedArray<E, P, KeyMap>
  : T extends object
  ? TransformTypes<T, KeyMap>
  : T;

/** @internal */
type TransformedArray<T, P, KeyMap extends object> = P extends keyof KeyMap
  ? KeyMap[P] extends Array<infer T2>
    ? Array<TransformedValue<T2, '', KeyMap> | undefined>
    : KeyMap[P] | undefined
  : Array<TransformedValue<T, '', KeyMap>>;

/** @internal */
export type TransformTypes<T, KeyMap extends object> = T extends Array<infer E>
  ? TransformedArray<E, '', KeyMap>
  : MapTypes<{ [P in keyof T]: TransformedValue<Exclude<T[P], undefined>, P, KeyMap> }, KeyMap>;

export type CollectionEntry<C extends Collection = Collection> = C | C[];

export type CollectionEntryMap<C extends Collection = Collection> = Record<string, CollectionEntry<C>>;

/** @internal */
export type GetTypeMap<M extends CollectionEntryMap> = Obj<
  UnionToIntersection<
    Exclude<
      {
        [K in keyof M]: M[K] extends Collection<infer T>
          ? { [P in K]: T }
          : M[K] extends Collection<infer T>[]
          ? { [P in K]: T[] }
          : undefined;
      }[keyof M],
      undefined
    >
  >
>;

/* eslint-enable @typescript-eslint/ban-types */
