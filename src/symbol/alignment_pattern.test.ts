import { describe, it, expect } from 'vitest';

import {
  columnsAndRowsPositions,
  getAlignmentPatternPositions,
} from './alignment_pattern';

describe('AlignmentPattern', () => {
  // See Annex E on page 83.
  describe.each([
    // Version 1
    { size: 21, positions: [6] },
    // Version 2
    { size: 25, positions: [6, 18] },
    // Version 3
    { size: 29, positions: [6, 22] },
    // Version 4
    { size: 33, positions: [6, 26] },
    // Version 5
    { size: 37, positions: [6, 30] },
    // Version 6
    { size: 41, positions: [6, 34] },
    // Version 7
    { size: 45, positions: [6, 22, 38] },
    // Version 8
    { size: 49, positions: [6, 24, 42] },
    // Version 9
    { size: 53, positions: [6, 26, 46] },
    // Version 10
    { size: 57, positions: [6, 28, 50] },
    // Version 11
    { size: 61, positions: [6, 30, 54] },
    // Version 12
    { size: 65, positions: [6, 32, 58] },
    // Version 13
    { size: 69, positions: [6, 34, 62] },
    // Version 14
    { size: 73, positions: [6, 26, 46, 66] },
    // Version 15
    { size: 77, positions: [6, 26, 48, 70] },
    // Version 16
    { size: 81, positions: [6, 26, 50, 74] },
    // Version 17
    { size: 85, positions: [6, 30, 54, 78] },
    // Version 18
    { size: 89, positions: [6, 30, 56, 82] },
    // Version 19
    { size: 93, positions: [6, 30, 58, 86] },
    // Version 20
    { size: 97, positions: [6, 34, 62, 90] },
    // Version 21
    { size: 101, positions: [6, 28, 50, 72, 94] },
    //
    // ...
    //
    // Version 27
    { size: 125, positions: [6, 34, 62, 90, 118] },
    // Version 28
    { size: 129, positions: [6, 26, 50, 74, 98, 122] },
    // Version 29
    { size: 133, positions: [6, 30, 54, 78, 102, 126] },
    // Version 30
    { size: 137, positions: [6, 26, 52, 78, 104, 130] },
    //
    // ...
    //
    // Version 34
    { size: 153, positions: [6, 34, 62, 90, 118, 146] },
    // Version 35
    { size: 157, positions: [6, 30, 54, 78, 102, 126, 150] },
    //
    // ...
    //
    // Version 40
    { size: 177, positions: [6, 30, 58, 86, 114, 142, 170] },
  ])('size $size', ({ size, positions }) => {
    it('has the correct columns and rows positions', () => {
      // Act
      const result = columnsAndRowsPositions(size);

      // Assert
      expect(result).toEqual(positions);
    });
  });

  it('should return the correct alignment pattern positions', () => {
    // Arrange
    const size = 45; // Version 7
    const expectedPositions = [
      [6, 22],
      [22, 6],
      [22, 22],
      [22, 38],
      [38, 22],
      [38, 38],
    ];

    // Act
    const positions = getAlignmentPatternPositions(size);

    // Assert
    expect(positions).toEqual(expectedPositions);
  });
});
