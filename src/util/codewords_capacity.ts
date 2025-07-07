import { Version, Size } from '../types';
import { versionToSize } from './version';
import { columnsAndRowsCount, alignmentPatternCount } from './alignment';

const FINDER_PATTERN_SIZE = 8 * 8; // Each finder pattern is 7x7 Plus 1 for the separator
const ALIGNMENT_PATTERN_SIZE = 5 * 5; // Each alignment pattern is 5x5
const FORMAT_INFO_SIZE = 2 * 15 + 1; // Format information bits
const VERSION_INFO_SIZE = 18; // Version information bits

export function codewordsCapacityFromVersion(version: Version): number {
  return codewordsCapacity(versionToSize(version));
}

export function codewordsCapacity(size: Size): number {
  const fullMatrixSize = size * size;
  const timingPatternSize = size - 16; // Horizontal and vertical timing patterns
  const versionInfoSize = size >= 45 ? VERSION_INFO_SIZE : 0; // Version information bits, only for versions >= 7 (size >= 45)

  const bits =
    fullMatrixSize -
    3 * FINDER_PATTERN_SIZE - // 3 finder patterns
    FORMAT_INFO_SIZE - // format information bits
    alignmentPatternCount(size) * ALIGNMENT_PATTERN_SIZE - // alignment pattern
    numberOfAlignmentPatternsIntersected(size) * -5 - // intersected alignment patterns
    2 * timingPatternSize - // 2 timing patterns
    2 * versionInfoSize; // 2 version information blocks
  return bits >> 3; // Convert bits to bytes
}

/**
 * Calculates the number of alignment patterns intersected with the timing patterns.
 */
function numberOfAlignmentPatternsIntersected(size: number): number {
  if (size < 25) return 0; // version 1 does not have alignment patterns.
  const edgeAlignmentPatterns = columnsAndRowsCount(size) - 2;
  return edgeAlignmentPatterns * 2;
}
