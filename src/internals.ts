import {
  Collection,
  IGenericRecord,
  SortCompare,
  IdOf,
  SearchCompare,
  GetTypeMap,
  CollectionEntryMap,
  TransformTypes,
} from './types';
import cache from './cache';

/** @internal */
export const defaultSort = <T>(a: T, b: T): 0 | 1 | -1 => (a < b ? -1 : a > b ? 1 : 0);

/** @internal */
export function findNearestIndex<T>(
  arr: T[],
  v: T,
  cmp: SortCompare<T> = defaultSort,
  min = 0,
  max = arr.length - 1
): number {
  const pivot = min + Math.floor((max - min) / 2);
  const c = cmp(v, arr[pivot]);

  if (c === 1) {
    if (max === pivot || cmp(v, arr[max]) >= 0) return max + 1;
    if (max - pivot <= 1) return max;
    return findNearestIndex(arr, v, cmp, pivot + 1, max - 1);
  }

  if (c === -1) {
    if (min === pivot || cmp(v, arr[min]) <= 0) return min;
    return findNearestIndex(arr, v, cmp, min + 1, pivot);
  }

  return pivot;
}

/** @internal */
export function sortedFindIndex<T>(arr: T[], cmp: SearchCompare<T>, min = 0, max = arr.length - 1): number {
  const pivot = min + Math.floor((max - min) / 2);
  const c = cmp(arr[pivot]);

  if (c === 1) {
    if (max === pivot) return -1;
    switch (cmp(arr[max])) {
      case 1:
        return -1;
      case -1:
        return sortedFindIndex(arr, cmp, pivot + 1, max);
      default:
        return max;
    }
  }

  if (c === -1) {
    if (min === pivot) return -1;
    switch (cmp(arr[min])) {
      case -1:
        return -1;
      case 1:
        return sortedFindIndex(arr, cmp, min, pivot - 1);
      default:
        return min;
    }
  }

  return pivot;
}

/** @internal */
export function insertionSort<T extends IGenericRecord>(
  collection: Collection<T>,
  record: T,
  compare?: SortCompare<keyof typeof collection>,
  data = cache.get(collection)
): Collection<T> {
  if (!data.keys.length) {
    data.keys.push(record.id as IdOf<T>);
    collection[record.id] = record;
    return collection;
  }

  return insertRecord(
    collection,
    record,
    findNearestIndex(data.keys, record.id as keyof typeof collection, compare),
    data.keys,
    true
  );
}

/** @internal */
export function insertRecord<T extends IGenericRecord>(
  collection: Collection<T>,
  record: T,
  index = 0,
  keys = cache.get(collection).keys,
  force = false
): Collection<T> {
  const { id } = record;

  if (!collection[id]) {
    if (!index) keys.unshift(id as IdOf<T>);
    else {
      keys.length += 1;
      for (let i = keys.length - 1, l = index; i >= l; i--) {
        keys[i] = keys[i - 1];
      }
      keys[index < keys.length - 1 ? index : keys.length - 1] = id as IdOf<T>;
    }
  } else if (force) {
    moveKey(collection, record.id, index, keys);
  }

  collection[id] = record;

  return collection;
}

/** @internal */
export function moveKey<T extends IGenericRecord>(
  collection: Collection<T>,
  id: T['id'],
  index: number,
  keys = cache.get(collection).keys
): Collection<T> {
  if (collection[id]) {
    const start = (keys as IdOf<T>[]).indexOf(id as IdOf<T>);

    if (index >= keys.length) {
      keys.splice(start, 1);
      keys.push(id as IdOf<T>);
    } else if (index <= 0) {
      keys.splice(start, 1);
      keys.unshift(id as IdOf<T>);
    } else if (start < index) {
      for (let i = start; i < index - 1; i++) {
        keys[i] = keys[i + 1];
      }
      (keys as IdOf<T>[])[index - 1] = id as IdOf<T>;
    } else if (start > index) {
      for (let i = start; i > index; i--) {
        keys[i] = keys[i - 1];
      }
      (keys as IdOf<T>[])[index] = id as IdOf<T>;
    }
  }

  return collection;
}

/** @internal */
export function cloneValue<T>(v: T): T {
  if (Array.isArray(v)) {
    return (v.map(cloneValue) as unknown) as T;
  }
  if (v && typeof v === 'object') {
    return (Object.keys(v).reduce((next: Record<number | string | symbol, any>, k) => {
      next[k] = cloneValue((v as Record<number | string | symbol, any>)[k]);
      return next;
    }, {}) as unknown) as T;
  }
  return v;
}

/** @internal */
// eslint-disable-next-line @typescript-eslint/ban-types
export function expandObject<T extends object, M extends CollectionEntryMap>(
  obj: T,
  collections: M,
  mutate: boolean,
  expanded: WeakMap<any, boolean>
): TransformTypes<T, GetTypeMap<typeof collections>> {
  const out = (Object.keys(obj) as Array<keyof T>).reduce((next, key) => {
    const c = collections[key as string];
    const v = obj[key];

    if (Array.isArray(c) && Array.isArray(v)) {
      if (mutate) {
        for (let i = 0, l = v.length; i < l; i++) {
          v[i] = expandValues(typeof v[i] !== 'object' ? c[0][v[i]] : v[i], collections, mutate, expanded);
        }
      } else {
        next[key as keyof typeof next] = v.map((id) => expandValues(c[0][id], collections, mutate, expanded)) as any;
      }
    } else if (c && v) {
      next[key as keyof typeof next] = expandValues(
        ((!mutate || typeof v !== 'object'
          ? c[(v as unknown) as keyof typeof c]
          : // eslint-disable-next-line @typescript-eslint/ban-types
            v) as unknown) as object,
        collections,
        mutate,
        expanded
      ) as any;
    } else if (v && typeof v === 'object') {
      // eslint-disable-next-line @typescript-eslint/ban-types
      next[key as keyof typeof next] = expandValues((v as unknown) as object, collections, mutate, expanded) as any;
    } else if (!mutate) {
      next[key as keyof typeof next] = v as any;
    }

    return next;
  }, (mutate ? obj : {}) as Partial<TransformTypes<T, GetTypeMap<typeof collections>>>) as TransformTypes<
    T,
    GetTypeMap<typeof collections>
  >;

  expanded.set(out, true);
  return out;
}

/** @internal */
export function expandArray<T extends any[], M extends CollectionEntryMap>(
  arr: T,
  collections: M,
  mutate: boolean,
  expanded: WeakMap<any, boolean>
): TransformTypes<T, GetTypeMap<typeof collections>> {
  if (mutate) {
    for (let i = 0, l = arr.length; i < l; i++) {
      if (arr[i] && typeof arr[i] === 'object') arr[i] = expandValues(arr[i], collections, true, expanded);
    }
    return arr as TransformTypes<T, GetTypeMap<typeof collections>>;
  }
  return arr.map((e) =>
    e && typeof e === 'object' ? expandValues(e, collections, mutate, expanded) : e
  ) as TransformTypes<T, GetTypeMap<typeof collections>>;
}

/** @internal */
// eslint-disable-next-line @typescript-eslint/ban-types
export function expandValues<T extends object, M extends CollectionEntryMap>(
  mixed: T,
  collections: M,
  mutate = false,
  expanded = new WeakMap()
): TransformTypes<T, GetTypeMap<typeof collections>> {
  if (mixed) {
    if (expanded.get(mixed)) return mixed as TransformTypes<T, GetTypeMap<typeof collections>>;
    expanded.set(mixed, true);
    if (Array.isArray(mixed)) {
      return expandArray(mixed, collections, mutate, expanded) as TransformTypes<T, GetTypeMap<typeof collections>>;
    }
    return expandObject(mixed, collections, mutate, expanded);
  }
  return mixed;
}
