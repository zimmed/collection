import { Collection, IGenericRecord, SortCompare, SearchCompare } from './types';
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
  const index = data.keys.length ? findNearestIndex(data.keys, record.id as keyof typeof collection, compare) : 0;

  return insertRecord(collection, record, index, data);
}

/** @internal */
export function insertRecord<T extends IGenericRecord>(
  collection: Collection<T>,
  record: T,
  index: number,
  data = cache.get(collection)
): Collection<T> {
  let start;

  if (collection[record.id]) {
    start = data.keys.indexOf(record.id as keyof typeof collection);
  } else {
    start = data.keys.length;
    data.keys.length += 1;
  }

  if (start < index) {
    for (let i = start; i < index; i++) {
      data.keys[i] = data.keys[i + 1];
    }
  } else if (start > index) {
    for (let i = start; i > index; i--) {
      data.keys[i] = data.keys[i - 1];
    }
  }

  collection[record.id] = record;
  data.keys[index] = record.id as keyof typeof collection;
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
