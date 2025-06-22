import { describe, it, expect } from 'vitest';

import { generateBCHCodeword } from './bose_chaudhuri_hocquenghem';

describe('Bose-Chaudhuri-Hocquenghem', () => {
  it.each([
    { input: 0b00000, errorCorrection: 0b0000000000 },
    { input: 0b00001, errorCorrection: 0b0100110111 },
    { input: 0b00010, errorCorrection: 0b1001101110 },
    { input: 0b00011, errorCorrection: 0b1101011001 },
    { input: 0b00100, errorCorrection: 0b0111101011 },
    { input: 0b00101, errorCorrection: 0b0011011100 },
    { input: 0b00110, errorCorrection: 0b1110000101 },
    { input: 0b00111, errorCorrection: 0b1010110010 },
    { input: 0b01000, errorCorrection: 0b1111010110 },
    { input: 0b01001, errorCorrection: 0b1011100001 },
    { input: 0b01010, errorCorrection: 0b0110111000 },
    { input: 0b01011, errorCorrection: 0b0010001111 },
    { input: 0b01100, errorCorrection: 0b1000111101 },
    { input: 0b01101, errorCorrection: 0b1100001010 },
    { input: 0b01110, errorCorrection: 0b0001010011 },
    { input: 0b01111, errorCorrection: 0b0101100100 },
    { input: 0b10000, errorCorrection: 0b1010011011 },
    { input: 0b10001, errorCorrection: 0b1110101100 },
    { input: 0b10010, errorCorrection: 0b0011110101 },
    { input: 0b10011, errorCorrection: 0b0111000010 },
    { input: 0b10100, errorCorrection: 0b1101110000 },
    { input: 0b10101, errorCorrection: 0b1001000111 },
    { input: 0b10110, errorCorrection: 0b0100011110 },
    { input: 0b10111, errorCorrection: 0b0000101001 },
    { input: 0b11000, errorCorrection: 0b0101001101 },
    { input: 0b11001, errorCorrection: 0b0001111010 },
    { input: 0b11010, errorCorrection: 0b1100100011 },
    { input: 0b11011, errorCorrection: 0b1000010100 },
    { input: 0b11100, errorCorrection: 0b0010100110 },
    { input: 0b11101, errorCorrection: 0b0110010001 },
    { input: 0b11110, errorCorrection: 0b1011001000 },
    { input: 0b11111, errorCorrection: 0b1111111111 },
  ])(
    '$input should produce error correct value $errorCorrection',
    ({ input, errorCorrection }) => {
      // Arrange
      const binaryInput = input
        .toString(2)
        .padStart(5, '0')
        .split('')
        .map(Number);
      const BinaryErrorCorrection = errorCorrection
        .toString(2)
        .padStart(10, '0')
        .split('')
        .map(Number);

      // Act
      const result = generateBCHCodeword(binaryInput, 15);

      // Assert
      expect(result).toEqual(binaryInput.concat(BinaryErrorCorrection));
    },
  );
});
