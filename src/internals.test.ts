import { findNearestIndex, sortedFindIndex } from './internals';

describe('findNearestIndex()', () => {
  it('should find the next ordered index for the specified number', () => {
    expect(findNearestIndex([1], 2)).toBe(1);
    expect(findNearestIndex([1], 0)).toBe(0);
    expect(findNearestIndex([1, 2], 2.5)).toBe(2);
    expect(findNearestIndex([1, 2], 1.5)).toBe(1);
    expect(findNearestIndex([1, 2], 0.5)).toBe(0);
    expect(findNearestIndex([1, 2, 3], 3.5)).toBe(3);
    expect(findNearestIndex([1, 2, 3], 2.5)).toBe(2);
    expect(findNearestIndex([1, 2, 3], 1.5)).toBe(1);
    expect(findNearestIndex([1, 2, 3], 0.5)).toBe(0);
    expect(findNearestIndex([1, 2, 3, 4], 4.5)).toBe(4);
    expect(findNearestIndex([1, 2, 3, 4, 5], 5.5)).toBe(5);
    expect(findNearestIndex([1, 2, 3, 4, 5, 6], 2)).toBe(1);
    expect(findNearestIndex([1, 2, 3, 4, 5, 6, 7, 8, 9, 10], 7)).toBe(6);
    expect(
      findNearestIndex(
        Array(100)
          .fill(0)
          .map((_, i) => i + 1),
        7
      )
    ).toBe(6);
  });

  it('should find the next ordered index for the specified string', () => {
    expect(findNearestIndex(['bar', 'foo'], 'baz')).toBe(1);
    expect(findNearestIndex(['bar', 'foo'], 'fa')).toBe(1);
    expect(findNearestIndex(['bar', 'foo'], 'fu')).toBe(2);
    expect(findNearestIndex(['bar', 'baz', 'foo'], 'baw')).toBe(1);
    expect(findNearestIndex(['bar', 'baz', 'foo'], 'bee')).toBe(2);
    expect(findNearestIndex(['bar', 'baz', 'foo'], 'fu')).toBe(3);
  });

  it('should use the specified compare function to find the next sorted index', () => {
    const cmp = (a: string, b: string) => (a < b ? 1 : a > b ? -1 : 0);

    expect(findNearestIndex(['foo', 'bar'], 'baz', cmp)).toBe(1);
    expect(findNearestIndex(['foo', 'bar'], 'fa', cmp)).toBe(1);
    expect(findNearestIndex(['foo', 'bar'], 'fu', cmp)).toBe(0);
    expect(findNearestIndex(['foo', 'baz', 'bar'], 'baw', cmp)).toBe(2);
    expect(findNearestIndex(['foo', 'baz', 'bar'], 'bee', cmp)).toBe(1);
    expect(findNearestIndex(['foo', 'baz', 'bar'], 'fu', cmp)).toBe(0);
  });
});

describe('sortedFindIndex()', () => {
  const cmp = <T>(v: T) => (e: T): 1 | 0 | -1 => (v < e ? -1 : v > e ? 1 : 0);

  it('should find the index for the specified number comparison', () => {
    expect(sortedFindIndex([1], cmp(1))).toBe(0);
    expect(sortedFindIndex([1], cmp(2))).toBe(-1);
    expect(sortedFindIndex([1, 2], cmp(2))).toBe(1);
    expect(sortedFindIndex([1, 2], cmp(1))).toBe(0);
    expect(sortedFindIndex([1, 2], cmp(0))).toBe(-1);
    expect(sortedFindIndex([1, 2, 3], cmp(3))).toBe(2);
    expect(sortedFindIndex([1, 2, 3, 4], cmp(4))).toBe(3);
    expect(sortedFindIndex([1, 2, 3, 4, 5], cmp(5))).toBe(4);
    expect(sortedFindIndex([1, 2, 3, 4, 5, 6], cmp(6))).toBe(5);
    expect(sortedFindIndex([1, 2, 3, 4, 5, 6, 7, 8, 9, 10], cmp(7))).toBe(6);
    expect(
      sortedFindIndex(
        Array(100)
          .fill(0)
          .map((_, i) => i + 1),
        cmp(31)
      )
    ).toBe(30);
    expect(
      sortedFindIndex(
        Array(100)
          .fill(0)
          .map((_, i) => i + 1),
        cmp(-100)
      )
    ).toBe(-1);
  });

  it('should find the index for the specified string comparison', () => {
    expect(sortedFindIndex(['bar', 'foo'], cmp('bar'))).toBe(0);
    expect(sortedFindIndex(['bar', 'foo'], cmp('foo'))).toBe(1);
    expect(sortedFindIndex(['bar', 'foo'], cmp('baz'))).toBe(-1);
  });
});
