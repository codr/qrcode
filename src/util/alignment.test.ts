import { describe, it, expect } from 'vitest';

import { alignmentPatternCount, columnsAndRowsCount } from './alignment';

describe('Alignment', () => {
  // See Annex E on page 83.
  describe.each([
    // Version 1
    { size: 21, columnsAndRows: 1, patterns: 0 },
    // Version 2
    { size: 25, columnsAndRows: 2, patterns: 1 },
    // Version 3
    { size: 29, columnsAndRows: 2, patterns: 1 },
    // Version 4
    { size: 33, columnsAndRows: 2, patterns: 1 },
    // Version 5
    { size: 37, columnsAndRows: 2, patterns: 1 },
    // Version 6
    { size: 41, columnsAndRows: 2, patterns: 1 },
    // Version 7
    { size: 45, columnsAndRows: 3, patterns: 6 },
    // Version 8
    { size: 49, columnsAndRows: 3, patterns: 6 },
    // Version 9
    { size: 53, columnsAndRows: 3, patterns: 6 },
    // Version 10
    { size: 57, columnsAndRows: 3, patterns: 6 },
    // Version 11
    { size: 61, columnsAndRows: 3, patterns: 6 },
    // Version 12
    { size: 65, columnsAndRows: 3, patterns: 6 },
    // Version 13
    { size: 69, columnsAndRows: 3, patterns: 6 },
    // Version 14
    { size: 73, columnsAndRows: 4, patterns: 13 },
    // Version 15
    { size: 77, columnsAndRows: 4, patterns: 13 },
    // Version 16
    { size: 81, columnsAndRows: 4, patterns: 13 },
    // Version 17
    { size: 85, columnsAndRows: 4, patterns: 13 },
    // Version 18
    { size: 89, columnsAndRows: 4, patterns: 13 },
    // Version 19
    { size: 93, columnsAndRows: 4, patterns: 13 },
    // Version 20
    { size: 97, columnsAndRows: 4, patterns: 13 },
    // Version 21
    { size: 101, columnsAndRows: 5, patterns: 22 },
    //
    // ...
    //
    // Version 27
    { size: 125, columnsAndRows: 5, patterns: 22 },
    // Version 28
    { size: 129, columnsAndRows: 6, patterns: 33 },
    // Version 29
    { size: 133, columnsAndRows: 6, patterns: 33 },
    // Version 30
    { size: 137, columnsAndRows: 6, patterns: 33 },
    //
    // ...
    //
    // Version 34
    { size: 153, columnsAndRows: 6, patterns: 33 },
    // Version 35
    { size: 157, columnsAndRows: 7, patterns: 46 },
    //
    // ...
    //
    // Version 40
    { size: 177, columnsAndRows: 7, patterns: 46 },
  ])('size $size', ({ size, columnsAndRows, patterns }) => {
    it('has the correct number of alignment patterns', () => {
      // Act
      const patternCount = alignmentPatternCount(size);

      // Assert
      expect(patternCount).toBe(patterns);
    });

    it('has the correct number of columns and rows', () => {
      // Act
      const count = columnsAndRowsCount(size);

      // Assert
      expect(count).toBe(columnsAndRows);
    });
  });
});
