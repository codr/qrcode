import { describe, it, expect } from 'vitest';

import { generateGeneratorPoly, TEST_ONLY } from './poly_math';

const { gfExp, gfLog } = TEST_ONLY;

describe('polyMath', () => {
  it.each([
    {
      numberOfSymbols: 2,
      expectedExponents: [0, 25, 1],
      // expected: [1, 3, 2],
    },
    {
      numberOfSymbols: 5,
      expectedExponents: [0, 113, 164, 166, 119, 10],
      // expected: [1, 31, 198, 63, 147, 116],
    },
    {
      numberOfSymbols: 6,
      expectedExponents: [0, 166, 0, 134, 5, 176, 15],
      // expected:       [1,  63, 1, 218, 32, 227, 38],
    },
    {
      numberOfSymbols: 7,
      expectedExponents: [0, 87, 229, 146, 149, 238, 102, 21],
      // expected:       [1, 127, 122, 154, 164, 11,  68, 117],
    },
    {
      numberOfSymbols: 8,
      expectedExponents: [0, 175, 238, 208, 249, 215, 252, 196, 28],
      // expected:       [1, 255,  11,  81,  54, 239, 173, 200, 24],
    },
    {
      numberOfSymbols: 10,
      expectedExponents: [0, 251, 67, 46, 61, 118, 70, 64, 94, 32, 45],
      // expected:     [1, 216, 194, 159, 111, 199, 94, 95, 113, 157, 193],
    },
  ])(
    'generateGeneratorPoly($numberOfSymbols) is correct',
    ({ numberOfSymbols, expectedExponents /*, expected */ }) => {
      // Act
      const result = generateGeneratorPoly(numberOfSymbols);

      // Assert
      // expect(result).toEqual(expected);
      expect(result).toEqual(expectedExponents.map(gfExp));
    },
  );

  describe('Galois Field Tables', () => {
    it('EXP_TABLE and LOG_TABLE should be inverses for all non-zero values', () => {
      for (let x = 1; x < 256; x++) {
        const log = gfLog(x);
        const exp = gfExp(log);

        expect(exp).toBe(x);
      }
    });

    it('LOG_TABLE and EXP_TABLE should be inverses for all log values', () => {
      for (let i = 0; i < 256 * 2; i++) {
        const exp = gfExp(i);
        const log = gfLog(exp);

        expect.soft(log).toBe(i % 255);
      }
    });

    // Handful of spot checks to ensure the tables are initialized correctly
    // see https://www.thonky.com/qr-code-tutorial/log-antilog-table
    it('should have the correct values', () => {
      expect(gfExp(0)).toBe(1);
      expect(gfExp(1)).toBe(2);
      expect(gfExp(2)).toBe(4);
      expect(gfExp(3)).toBe(8);

      expect(gfExp(8)).toBe(29);
      expect(gfExp(10)).toBe(116);
      expect(gfExp(29)).toBe(48);
      expect(gfExp(46)).toBe(159);
      expect(gfExp(61)).toBe(111);
      expect(gfExp(64)).toBe(95);
      expect(gfExp(70)).toBe(94);
      expect(gfExp(118)).toBe(199);
    });
  });
});
