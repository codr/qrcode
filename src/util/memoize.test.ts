import { describe, it, expect, vi } from 'vitest';

import { memoize } from './memoize';

describe('memoize', () => {
  it('should cache results for the same input', () => {
    const mockFn = vi.fn((x: number) => x * 2);
    const memoized = memoize(mockFn);

    expect(memoized(5)).toBe(10);
    expect(memoized(5)).toBe(10);
    expect(mockFn).toHaveBeenCalledTimes(1);
  });

  it('should work with different inputs', () => {
    const mockFn = vi.fn((x: number) => x * x);
    const memoized = memoize(mockFn);

    expect(memoized(3)).toBe(9);
    expect(memoized(4)).toBe(16);
    expect(memoized(3)).toBe(9); // cached
    expect(mockFn).toHaveBeenCalledTimes(2);
  });

  it('should work with string inputs', () => {
    const mockFn = vi.fn((s: string) => s.length);
    const memoized = memoize(mockFn);

    expect(memoized('hello')).toBe(5);
    expect(memoized('world')).toBe(5);
    expect(memoized('hello')).toBe(5); // cached
    expect(mockFn).toHaveBeenCalledTimes(2);
  });

  it('should show performance improvement', () => {
    const slowFn = (n: number) => {
      // Simulate expensive computation
      let sum = 0;
      for (let i = 0; i < n * 1000; i++) sum += i;
      return sum;
    };

    const memoized = memoize(slowFn);

    const start1 = performance.now();
    const result1 = memoized(1000);
    const time1 = performance.now() - start1;

    const start2 = performance.now();
    const result2 = memoized(1000); // cached
    const time2 = performance.now() - start2;

    expect(result1).toBe(result2);
    expect(time2).toBeLessThan(time1 * 0.1); // Should be 10x faster
  });
});
