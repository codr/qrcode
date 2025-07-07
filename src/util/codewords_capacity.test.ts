import { describe, it, expect } from 'vitest';

import { Version, Size } from '../types';

import {
  codewordsCapacity,
  codewordsCapacityFromVersion,
} from './codewords_capacity';

describe('codewordsCapacity', () => {
  it.each([
    // See Table 1, page 19
    { version: 1, size: 21, capacity: 26 },
    { version: 2, size: 25, capacity: 44 },
    { version: 3, size: 29, capacity: 70 },
    { version: 4, size: 33, capacity: 100 },
    { version: 5, size: 37, capacity: 134 },
    { version: 6, size: 41, capacity: 172 },
    { version: 7, size: 45, capacity: 196 },
    { version: 8, size: 49, capacity: 242 },
    { version: 9, size: 53, capacity: 292 },
    { version: 10, size: 57, capacity: 346 },
    { version: 11, size: 61, capacity: 404 },
    { version: 12, size: 65, capacity: 466 },
    { version: 13, size: 69, capacity: 532 },
    { version: 14, size: 73, capacity: 581 },
    { version: 15, size: 77, capacity: 655 },
    { version: 16, size: 81, capacity: 733 },
    { version: 17, size: 85, capacity: 815 },
    { version: 18, size: 89, capacity: 901 },
    { version: 19, size: 93, capacity: 991 },
    { version: 20, size: 97, capacity: 1085 },
    { version: 21, size: 101, capacity: 1156 },
    { version: 22, size: 105, capacity: 1258 },
    { version: 23, size: 109, capacity: 1364 },
    { version: 24, size: 113, capacity: 1474 },
    { version: 25, size: 117, capacity: 1588 },
    { version: 26, size: 121, capacity: 1706 },
    { version: 27, size: 125, capacity: 1828 },
    { version: 28, size: 129, capacity: 1921 },
    { version: 29, size: 133, capacity: 2051 },
    { version: 30, size: 137, capacity: 2185 },
    { version: 31, size: 141, capacity: 2323 },
    { version: 32, size: 145, capacity: 2465 },
    { version: 33, size: 149, capacity: 2611 },
    { version: 34, size: 153, capacity: 2761 },
    { version: 35, size: 157, capacity: 2876 },
    { version: 36, size: 161, capacity: 3034 },
    { version: 37, size: 165, capacity: 3196 },
    { version: 38, size: 169, capacity: 3362 },
    { version: 39, size: 173, capacity: 3532 },
    { version: 40, size: 177, capacity: 3706 },
  ] as { version: Version; size: Size; capacity: number }[])(
    // See Table 7, page 33
    'Version $version has size $size and capacity $capacity',
    ({ version, size, capacity }) => {
      expect(codewordsCapacityFromVersion(version)).toBe(capacity);
      expect(codewordsCapacity(size)).toBe(capacity);
    },
  );
});
