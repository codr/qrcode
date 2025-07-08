import { describe, it, expect } from 'vitest';

import { ErrorCorrectionLevel } from '../constants/error_correction_levels';
import { Version, Size } from '../types';

import {
  dataCodewordsCapacity,
  dataCodewordsCapacityFromVersion,
} from './data_codewords_capacity';

describe('dataCodewordsCapacity', () => {
  describe.each([
    {
      version: 1,
      size: 21,
      capacities: {
        [ErrorCorrectionLevel.L]: 19,
        [ErrorCorrectionLevel.M]: 16,
        [ErrorCorrectionLevel.Q]: 13,
        [ErrorCorrectionLevel.H]: 9,
      },
    },
    {
      version: 2,
      size: 25,
      capacities: {
        [ErrorCorrectionLevel.L]: 34,
        [ErrorCorrectionLevel.M]: 28,
        [ErrorCorrectionLevel.Q]: 22,
        [ErrorCorrectionLevel.H]: 16,
      },
    },
    {
      version: 3,
      size: 29,
      capacities: {
        [ErrorCorrectionLevel.L]: 55,
        [ErrorCorrectionLevel.M]: 44,
        [ErrorCorrectionLevel.Q]: 34,
        [ErrorCorrectionLevel.H]: 26,
      },
    },
    {
      version: 4,
      size: 33,
      capacities: {
        [ErrorCorrectionLevel.L]: 80,
        [ErrorCorrectionLevel.M]: 64,
        [ErrorCorrectionLevel.Q]: 48,
        [ErrorCorrectionLevel.H]: 36,
      },
    },
    {
      version: 5,
      size: 37,
      capacities: {
        [ErrorCorrectionLevel.L]: 108,
        [ErrorCorrectionLevel.M]: 86,
        [ErrorCorrectionLevel.Q]: 64,
        [ErrorCorrectionLevel.H]: 46,
      },
    },
    {
      version: 6,
      size: 41,
      capacities: {
        [ErrorCorrectionLevel.L]: 136,
        [ErrorCorrectionLevel.M]: 108,
        [ErrorCorrectionLevel.Q]: 76,
        [ErrorCorrectionLevel.H]: 60,
      },
    },
    {
      version: 7,
      size: 45,
      capacities: {
        [ErrorCorrectionLevel.L]: 156,
        [ErrorCorrectionLevel.M]: 124,
        [ErrorCorrectionLevel.Q]: 88,
        [ErrorCorrectionLevel.H]: 66,
      },
    },
    {
      version: 8,
      size: 49,
      capacities: {
        [ErrorCorrectionLevel.L]: 194,
        [ErrorCorrectionLevel.M]: 154,
        [ErrorCorrectionLevel.Q]: 110,
        [ErrorCorrectionLevel.H]: 86,
      },
    },
    {
      version: 9,
      size: 53,
      capacities: {
        [ErrorCorrectionLevel.L]: 232,
        [ErrorCorrectionLevel.M]: 182,
        [ErrorCorrectionLevel.Q]: 132,
        [ErrorCorrectionLevel.H]: 100,
      },
    },
    {
      version: 10,
      size: 57,
      capacities: {
        [ErrorCorrectionLevel.L]: 274,
        [ErrorCorrectionLevel.M]: 216,
        [ErrorCorrectionLevel.Q]: 154,
        [ErrorCorrectionLevel.H]: 122,
      },
    },
    {
      version: 11,
      size: 61,
      capacities: {
        [ErrorCorrectionLevel.L]: 324,
        [ErrorCorrectionLevel.M]: 254,
        [ErrorCorrectionLevel.Q]: 180,
        [ErrorCorrectionLevel.H]: 140,
      },
    },
    {
      version: 12,
      size: 65,
      capacities: {
        [ErrorCorrectionLevel.L]: 370,
        [ErrorCorrectionLevel.M]: 290,
        [ErrorCorrectionLevel.Q]: 206,
        [ErrorCorrectionLevel.H]: 158,
      },
    },
    {
      version: 13,
      size: 69,
      capacities: {
        [ErrorCorrectionLevel.L]: 428,
        [ErrorCorrectionLevel.M]: 334,
        [ErrorCorrectionLevel.Q]: 244,
        [ErrorCorrectionLevel.H]: 180,
      },
    },
    {
      version: 14,
      size: 73,
      capacities: {
        [ErrorCorrectionLevel.L]: 461,
        [ErrorCorrectionLevel.M]: 365,
        [ErrorCorrectionLevel.Q]: 261,
        [ErrorCorrectionLevel.H]: 197,
      },
    },
    {
      version: 15,
      size: 77,
      capacities: {
        [ErrorCorrectionLevel.L]: 523,
        [ErrorCorrectionLevel.M]: 415,
        [ErrorCorrectionLevel.Q]: 295,
        [ErrorCorrectionLevel.H]: 223,
      },
    },
    {
      version: 16,
      size: 81,
      capacities: {
        [ErrorCorrectionLevel.L]: 589,
        [ErrorCorrectionLevel.M]: 453,
        [ErrorCorrectionLevel.Q]: 325,
        [ErrorCorrectionLevel.H]: 253,
      },
    },
    {
      version: 17,
      size: 85,
      capacities: {
        [ErrorCorrectionLevel.L]: 647,
        [ErrorCorrectionLevel.M]: 507,
        [ErrorCorrectionLevel.Q]: 367,
        [ErrorCorrectionLevel.H]: 283,
      },
    },
    {
      version: 18,
      size: 89,
      capacities: {
        [ErrorCorrectionLevel.L]: 721,
        [ErrorCorrectionLevel.M]: 563,
        [ErrorCorrectionLevel.Q]: 397,
        [ErrorCorrectionLevel.H]: 313,
      },
    },
    {
      version: 19,
      size: 93,
      capacities: {
        [ErrorCorrectionLevel.L]: 795,
        [ErrorCorrectionLevel.M]: 627,
        [ErrorCorrectionLevel.Q]: 445,
        [ErrorCorrectionLevel.H]: 341,
      },
    },
    {
      version: 20,
      size: 97,
      capacities: {
        [ErrorCorrectionLevel.L]: 861,
        [ErrorCorrectionLevel.M]: 669,
        [ErrorCorrectionLevel.Q]: 485,
        [ErrorCorrectionLevel.H]: 385,
      },
    },
    {
      version: 21,
      size: 101,
      capacities: {
        [ErrorCorrectionLevel.L]: 932,
        [ErrorCorrectionLevel.M]: 714,
        [ErrorCorrectionLevel.Q]: 512,
        [ErrorCorrectionLevel.H]: 406,
      },
    },
    {
      version: 22,
      size: 105,
      capacities: {
        [ErrorCorrectionLevel.L]: 1_006,
        [ErrorCorrectionLevel.M]: 782,
        [ErrorCorrectionLevel.Q]: 568,
        [ErrorCorrectionLevel.H]: 442,
      },
    },
    {
      version: 23,
      size: 109,
      capacities: {
        [ErrorCorrectionLevel.L]: 1_094,
        [ErrorCorrectionLevel.M]: 860,
        [ErrorCorrectionLevel.Q]: 614,
        [ErrorCorrectionLevel.H]: 464,
      },
    },
    {
      version: 24,
      size: 113,
      capacities: {
        [ErrorCorrectionLevel.L]: 1_174,
        [ErrorCorrectionLevel.M]: 914,
        [ErrorCorrectionLevel.Q]: 664,
        [ErrorCorrectionLevel.H]: 514,
      },
    },
    {
      version: 25,
      size: 117,
      capacities: {
        [ErrorCorrectionLevel.L]: 1_276,
        [ErrorCorrectionLevel.M]: 1_000,
        [ErrorCorrectionLevel.Q]: 718,
        [ErrorCorrectionLevel.H]: 538,
      },
    },
    {
      version: 26,
      size: 121,
      capacities: {
        [ErrorCorrectionLevel.L]: 1_370,
        [ErrorCorrectionLevel.M]: 1_062,
        [ErrorCorrectionLevel.Q]: 754,
        [ErrorCorrectionLevel.H]: 596,
      },
    },
    {
      version: 27,
      size: 125,
      capacities: {
        [ErrorCorrectionLevel.L]: 1_468,
        [ErrorCorrectionLevel.M]: 1_128,
        [ErrorCorrectionLevel.Q]: 808,
        [ErrorCorrectionLevel.H]: 628,
      },
    },
    {
      version: 28,
      size: 129,
      capacities: {
        [ErrorCorrectionLevel.L]: 1_531,
        [ErrorCorrectionLevel.M]: 1_193,
        [ErrorCorrectionLevel.Q]: 871,
        [ErrorCorrectionLevel.H]: 661,
      },
    },
    {
      version: 29,
      size: 133,
      capacities: {
        [ErrorCorrectionLevel.L]: 1_631,
        [ErrorCorrectionLevel.M]: 1_267,
        [ErrorCorrectionLevel.Q]: 911,
        [ErrorCorrectionLevel.H]: 701,
      },
    },
    {
      version: 30,
      size: 137,
      capacities: {
        [ErrorCorrectionLevel.L]: 1_735,
        [ErrorCorrectionLevel.M]: 1_373,
        [ErrorCorrectionLevel.Q]: 985,
        [ErrorCorrectionLevel.H]: 745,
      },
    },
    {
      version: 31,
      size: 141,
      capacities: {
        [ErrorCorrectionLevel.L]: 1_843,
        [ErrorCorrectionLevel.M]: 1_455,
        [ErrorCorrectionLevel.Q]: 1_033,
        [ErrorCorrectionLevel.H]: 793,
      },
    },
    {
      version: 32,
      size: 145,
      capacities: {
        [ErrorCorrectionLevel.L]: 1_955,
        [ErrorCorrectionLevel.M]: 1_541,
        [ErrorCorrectionLevel.Q]: 1_115,
        [ErrorCorrectionLevel.H]: 845,
      },
    },
    {
      version: 33,
      size: 149,
      capacities: {
        [ErrorCorrectionLevel.L]: 2_071,
        [ErrorCorrectionLevel.M]: 1_631,
        [ErrorCorrectionLevel.Q]: 1_171,
        [ErrorCorrectionLevel.H]: 901,
      },
    },
    {
      version: 34,
      size: 153,
      capacities: {
        [ErrorCorrectionLevel.L]: 2_191,
        [ErrorCorrectionLevel.M]: 1_725,
        [ErrorCorrectionLevel.Q]: 1_231,
        [ErrorCorrectionLevel.H]: 961,
      },
    },
    {
      version: 35,
      size: 157,
      capacities: {
        [ErrorCorrectionLevel.L]: 2_306,
        [ErrorCorrectionLevel.M]: 1_812,
        [ErrorCorrectionLevel.Q]: 1_286,
        [ErrorCorrectionLevel.H]: 986,
      },
    },
    {
      version: 36,
      size: 161,
      capacities: {
        [ErrorCorrectionLevel.L]: 2_434,
        [ErrorCorrectionLevel.M]: 1_914,
        [ErrorCorrectionLevel.Q]: 1_354,
        [ErrorCorrectionLevel.H]: 1_054,
      },
    },
    {
      version: 37,
      size: 165,
      capacities: {
        [ErrorCorrectionLevel.L]: 2_566,
        [ErrorCorrectionLevel.M]: 1_992,
        [ErrorCorrectionLevel.Q]: 1_426,
        [ErrorCorrectionLevel.H]: 1_096,
      },
    },
    {
      version: 38,
      size: 169,
      capacities: {
        [ErrorCorrectionLevel.L]: 2_702,
        [ErrorCorrectionLevel.M]: 2_102,
        [ErrorCorrectionLevel.Q]: 1_502,
        [ErrorCorrectionLevel.H]: 1_142,
      },
    },
    {
      version: 39,
      size: 173,
      capacities: {
        [ErrorCorrectionLevel.L]: 2_812,
        [ErrorCorrectionLevel.M]: 2_216,
        [ErrorCorrectionLevel.Q]: 1_582,
        [ErrorCorrectionLevel.H]: 1_222,
      },
    },
    {
      version: 40,
      size: 177,
      capacities: {
        [ErrorCorrectionLevel.L]: 2_956,
        [ErrorCorrectionLevel.M]: 2_334,
        [ErrorCorrectionLevel.Q]: 1_666,
        [ErrorCorrectionLevel.H]: 1_276,
      },
    },
  ] as {
    version: Version;
    size: Size;
    capacities: Record<ErrorCorrectionLevel, number>;
  }[])('Version $version (size $size)', ({ version, size, capacities }) => {
    const errorCorrectionLevels = Object.entries(capacities) as [
      ErrorCorrectionLevel,
      number,
    ][];
    it.each(errorCorrectionLevels)(
      'has the correct data capacity at $0',
      (level, capacity) => {
        expect(
          dataCodewordsCapacityFromVersion(
            version,
            level as ErrorCorrectionLevel,
          ),
        ).toBe(capacity);
        expect(dataCodewordsCapacity(size, level as ErrorCorrectionLevel)).toBe(
          capacity,
        );
      },
    );
  });
});
