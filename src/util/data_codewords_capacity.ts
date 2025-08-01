import { ErrorCorrectionLevel } from '../constants/error_correction_levels';
import { getErrorCorrectionLevelBits } from '../constants/error_correction_levels';
import { Version, Size } from '../types';
import { sizeToVersion } from './version';

// See Table 7, page 33
const DATA_CAPACITY_MAP: Record<Version, [number, number, number, number]> = {
  1: [19, 16, 13, 9],
  2: [34, 28, 22, 16],
  3: [55, 44, 34, 26],
  4: [80, 64, 48, 36],
  5: [108, 86, 64, 46],
  6: [136, 108, 76, 60],
  7: [156, 124, 88, 66],
  8: [194, 154, 110, 86],
  9: [232, 182, 132, 100],
  10: [274, 216, 154, 122],
  11: [324, 254, 180, 140],
  12: [370, 290, 206, 158],
  13: [428, 334, 244, 180],
  14: [461, 365, 261, 197],
  15: [523, 415, 295, 223],
  16: [589, 453, 325, 253],
  17: [647, 507, 367, 283],
  18: [721, 563, 397, 313],
  19: [795, 627, 445, 341],
  20: [861, 669, 485, 385],
  21: [932, 714, 512, 406],
  22: [1006, 782, 568, 442],
  23: [1094, 860, 614, 464],
  24: [1174, 914, 664, 514],
  25: [1276, 1000, 718, 538],
  26: [1370, 1062, 754, 596],
  27: [1468, 1128, 808, 628],
  28: [1531, 1193, 871, 661],
  29: [1631, 1267, 911, 701],
  30: [1735, 1373, 985, 745],
  31: [1843, 1455, 1033, 793],
  32: [1955, 1541, 1115, 845],
  33: [2071, 1631, 1171, 901],
  34: [2191, 1725, 1231, 961],
  35: [2306, 1812, 1286, 986],
  36: [2434, 1914, 1354, 1054],
  37: [2566, 1992, 1426, 1096],
  38: [2702, 2102, 1502, 1142],
  39: [2812, 2216, 1582, 1222],
  40: [2956, 2334, 1666, 1276],
};

export function dataCodewordsCapacityFromVersion(
  version: Version,
  errorCorrectionLevel: ErrorCorrectionLevel,
): number {
  // Here we use a mask of 0b01 so that we can use the error correction level bit as an index.
  // This transforms [1, 0, 3, 2] into [0, 1, 2, 3] for the error correction levels L, M, Q, H.
  const dataCodewordsSizeIndex =
    getErrorCorrectionLevelBits(errorCorrectionLevel) ^ 0b01;
  return DATA_CAPACITY_MAP[version][dataCodewordsSizeIndex];
}

export function dataCodewordsCapacity(
  size: Size,
  errorCorrectionLevel: ErrorCorrectionLevel,
): number {
  return dataCodewordsCapacityFromVersion(
    sizeToVersion(size),
    errorCorrectionLevel,
  );
}
