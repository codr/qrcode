import { describe, bench } from 'vitest';

import { memoize } from './memoize';

describe('memoize benchmarks', () => {
  const slowFn = (n: number) => {
    let sum = 0;
    for (let i = 0; i < n * 100; i++) sum += i;
    return sum;
  };

  const memoized = memoize(slowFn);
  memoized(500); // Pre-populate cache

  bench('un-memoized function', () => {
    slowFn(500);
  });

  bench('memoized function (cached)', () => {
    memoized(500);
  });
});
