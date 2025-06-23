import { describe, it, expect } from 'vitest';

import { getMaskPattern } from './masks';

describe('AlignmentPattern', () => {
  it('should return the correct mask pattern for 000', () => {
    // Arrange
    const matrix = getEmptyMatrix(21);
    const maskPattern = getMaskPattern(0b000);

    // Act
    applyMask(matrix, maskPattern);
    const maskPatternArray = arrayToQRArray(matrix);

    // Assert
    expect(maskPatternArray).toEqualQRArray([
      '██  ██  ██  ██  ██  ██  ██  ██  ██  ██  ██',
      '  ██  ██  ██  ██  ██  ██  ██  ██  ██  ██  ',
      '██  ██  ██  ██  ██  ██  ██  ██  ██  ██  ██',
      '  ██  ██  ██  ██  ██  ██  ██  ██  ██  ██  ',
      '██  ██  ██  ██  ██  ██  ██  ██  ██  ██  ██',
      '  ██  ██  ██  ██  ██  ██  ██  ██  ██  ██  ',
      '██  ██  ██  ██  ██  ██  ██  ██  ██  ██  ██',
      '  ██  ██  ██  ██  ██  ██  ██  ██  ██  ██  ',
      '██  ██  ██  ██  ██  ██  ██  ██  ██  ██  ██',
      '  ██  ██  ██  ██  ██  ██  ██  ██  ██  ██  ',
      '██  ██  ██  ██  ██  ██  ██  ██  ██  ██  ██',
      '  ██  ██  ██  ██  ██  ██  ██  ██  ██  ██  ',
      '██  ██  ██  ██  ██  ██  ██  ██  ██  ██  ██',
      '  ██  ██  ██  ██  ██  ██  ██  ██  ██  ██  ',
      '██  ██  ██  ██  ██  ██  ██  ██  ██  ██  ██',
      '  ██  ██  ██  ██  ██  ██  ██  ██  ██  ██  ',
      '██  ██  ██  ██  ██  ██  ██  ██  ██  ██  ██',
      '  ██  ██  ██  ██  ██  ██  ██  ██  ██  ██  ',
      '██  ██  ██  ██  ██  ██  ██  ██  ██  ██  ██',
      '  ██  ██  ██  ██  ██  ██  ██  ██  ██  ██  ',
      '██  ██  ██  ██  ██  ██  ██  ██  ██  ██  ██',
    ]);
  });

  it('should return the correct mask pattern for 001', () => {
    // Arrange
    const matrix = getEmptyMatrix(21);
    const maskPattern = getMaskPattern(0b001);

    // Act
    applyMask(matrix, maskPattern);

    // Assert
    const maskPatternArray = arrayToQRArray(matrix);
    expect(maskPatternArray).toEqualQRArray([
      '██████████████████████████████████████████',
      '                                          ',
      '██████████████████████████████████████████',
      '                                          ',
      '██████████████████████████████████████████',
      '                                          ',
      '██████████████████████████████████████████',
      '                                          ',
      '██████████████████████████████████████████',
      '                                          ',
      '██████████████████████████████████████████',
      '                                          ',
      '██████████████████████████████████████████',
      '                                          ',
      '██████████████████████████████████████████',
      '                                          ',
      '██████████████████████████████████████████',
      '                                          ',
      '██████████████████████████████████████████',
      '                                          ',
      '██████████████████████████████████████████',
    ]);
  });

  it('should return the correct mask pattern for 010', () => {
    // Arrange
    const matrix = getEmptyMatrix(21);
    const maskPattern = getMaskPattern(0b010);

    // Act
    applyMask(matrix, maskPattern);

    // Assert
    const maskPatternArray = arrayToQRArray(matrix);
    expect(maskPatternArray).toEqualQRArray([
      '██    ██    ██    ██    ██    ██    ██    ',
      '██    ██    ██    ██    ██    ██    ██    ',
      '██    ██    ██    ██    ██    ██    ██    ',
      '██    ██    ██    ██    ██    ██    ██    ',
      '██    ██    ██    ██    ██    ██    ██    ',
      '██    ██    ██    ██    ██    ██    ██    ',
      '██    ██    ██    ██    ██    ██    ██    ',
      '██    ██    ██    ██    ██    ██    ██    ',
      '██    ██    ██    ██    ██    ██    ██    ',
      '██    ██    ██    ██    ██    ██    ██    ',
      '██    ██    ██    ██    ██    ██    ██    ',
      '██    ██    ██    ██    ██    ██    ██    ',
      '██    ██    ██    ██    ██    ██    ██    ',
      '██    ██    ██    ██    ██    ██    ██    ',
      '██    ██    ██    ██    ██    ██    ██    ',
      '██    ██    ██    ██    ██    ██    ██    ',
      '██    ██    ██    ██    ██    ██    ██    ',
      '██    ██    ██    ██    ██    ██    ██    ',
      '██    ██    ██    ██    ██    ██    ██    ',
      '██    ██    ██    ██    ██    ██    ██    ',
      '██    ██    ██    ██    ██    ██    ██    ',
    ]);
  });

  it('should return the correct mask pattern for 011', () => {
    // Arrange
    const matrix = getEmptyMatrix(21);
    const maskPattern = getMaskPattern(0b011);

    // Act
    applyMask(matrix, maskPattern);

    // Assert
    const maskPatternArray = arrayToQRArray(matrix);
    expect(maskPatternArray).toEqualQRArray([
      '██    ██    ██    ██    ██    ██    ██    ',
      '    ██    ██    ██    ██    ██    ██    ██',
      '  ██    ██    ██    ██    ██    ██    ██  ',
      '██    ██    ██    ██    ██    ██    ██    ',
      '    ██    ██    ██    ██    ██    ██    ██',
      '  ██    ██    ██    ██    ██    ██    ██  ',
      '██    ██    ██    ██    ██    ██    ██    ',
      '    ██    ██    ██    ██    ██    ██    ██',
      '  ██    ██    ██    ██    ██    ██    ██  ',
      '██    ██    ██    ██    ██    ██    ██    ',
      '    ██    ██    ██    ██    ██    ██    ██',
      '  ██    ██    ██    ██    ██    ██    ██  ',
      '██    ██    ██    ██    ██    ██    ██    ',
      '    ██    ██    ██    ██    ██    ██    ██',
      '  ██    ██    ██    ██    ██    ██    ██  ',
      '██    ██    ██    ██    ██    ██    ██    ',
      '    ██    ██    ██    ██    ██    ██    ██',
      '  ██    ██    ██    ██    ██    ██    ██  ',
      '██    ██    ██    ██    ██    ██    ██    ',
      '    ██    ██    ██    ██    ██    ██    ██',
      '  ██    ██    ██    ██    ██    ██    ██  ',
    ]);
  });

  it('should return the correct mask pattern for 100', () => {
    // Arrange
    const matrix = getEmptyMatrix(21);
    const maskPattern = getMaskPattern(0b100);

    // Act
    applyMask(matrix, maskPattern);

    // Assert
    const maskPatternArray = arrayToQRArray(matrix);
    expect(maskPatternArray).toEqualQRArray([
      '██████      ██████      ██████      ██████',
      '██████      ██████      ██████      ██████',
      '      ██████      ██████      ██████      ',
      '      ██████      ██████      ██████      ',
      '██████      ██████      ██████      ██████',
      '██████      ██████      ██████      ██████',
      '      ██████      ██████      ██████      ',
      '      ██████      ██████      ██████      ',
      '██████      ██████      ██████      ██████',
      '██████      ██████      ██████      ██████',
      '      ██████      ██████      ██████      ',
      '      ██████      ██████      ██████      ',
      '██████      ██████      ██████      ██████',
      '██████      ██████      ██████      ██████',
      '      ██████      ██████      ██████      ',
      '      ██████      ██████      ██████      ',
      '██████      ██████      ██████      ██████',
      '██████      ██████      ██████      ██████',
      '      ██████      ██████      ██████      ',
      '      ██████      ██████      ██████      ',
      '██████      ██████      ██████      ██████',
    ]);
  });

  it('should return the correct mask pattern for 101', () => {
    // Arrange
    const matrix = getEmptyMatrix(21);
    const maskPattern = getMaskPattern(0b101);

    // Act
    applyMask(matrix, maskPattern);

    // Assert
    const maskPatternArray = arrayToQRArray(matrix);
    expect(maskPatternArray).toEqualQRArray([
      '██████████████████████████████████████████',
      '██          ██          ██          ██    ',
      '██    ██    ██    ██    ██    ██    ██    ',
      '██  ██  ██  ██  ██  ██  ██  ██  ██  ██  ██',
      '██    ██    ██    ██    ██    ██    ██    ',
      '██          ██          ██          ██    ',
      '██████████████████████████████████████████',
      '██          ██          ██          ██    ',
      '██    ██    ██    ██    ██    ██    ██    ',
      '██  ██  ██  ██  ██  ██  ██  ██  ██  ██  ██',
      '██    ██    ██    ██    ██    ██    ██    ',
      '██          ██          ██          ██    ',
      '██████████████████████████████████████████',
      '██          ██          ██          ██    ',
      '██    ██    ██    ██    ██    ██    ██    ',
      '██  ██  ██  ██  ██  ██  ██  ██  ██  ██  ██',
      '██    ██    ██    ██    ██    ██    ██    ',
      '██          ██          ██          ██    ',
      '██████████████████████████████████████████',
      '██          ██          ██          ██    ',
      '██    ██    ██    ██    ██    ██    ██    ',
    ]);
  });

  it('should return the correct mask pattern for 110', () => {
    // Arrange
    const matrix = getEmptyMatrix(21);
    const maskPattern = getMaskPattern(0b110);

    // Act
    applyMask(matrix, maskPattern);

    // Assert
    const maskPatternArray = arrayToQRArray(matrix);
    expect(maskPatternArray).toEqualQRArray([
      '██████████████████████████████████████████',
      '██████      ██████      ██████      ██████',
      '████  ████  ████  ████  ████  ████  ████  ',
      '██  ██  ██  ██  ██  ██  ██  ██  ██  ██  ██',
      '██  ████  ████  ████  ████  ████  ████  ██',
      '██      ██████      ██████      ██████    ',
      '██████████████████████████████████████████',
      '██████      ██████      ██████      ██████',
      '████  ████  ████  ████  ████  ████  ████  ',
      '██  ██  ██  ██  ██  ██  ██  ██  ██  ██  ██',
      '██  ████  ████  ████  ████  ████  ████  ██',
      '██      ██████      ██████      ██████    ',
      '██████████████████████████████████████████',
      '██████      ██████      ██████      ██████',
      '████  ████  ████  ████  ████  ████  ████  ',
      '██  ██  ██  ██  ██  ██  ██  ██  ██  ██  ██',
      '██  ████  ████  ████  ████  ████  ████  ██',
      '██      ██████      ██████      ██████    ',
      '██████████████████████████████████████████',
      '██████      ██████      ██████      ██████',
      '████  ████  ████  ████  ████  ████  ████  ',
    ]);
  });

  it('should return the correct mask pattern for 111', () => {
    // Arrange
    const matrix = getEmptyMatrix(21);
    const maskPattern = getMaskPattern(0b111);

    // Act
    applyMask(matrix, maskPattern);

    // Assert
    const maskPatternArray = arrayToQRArray(matrix);
    expect(maskPatternArray).toEqualQRArray([
      '██  ██  ██  ██  ██  ██  ██  ██  ██  ██  ██',
      '      ██████      ██████      ██████      ',
      '██      ██████      ██████      ██████    ',
      '  ██  ██  ██  ██  ██  ██  ██  ██  ██  ██  ',
      '██████      ██████      ██████      ██████',
      '  ██████      ██████      ██████      ████',
      '██  ██  ██  ██  ██  ██  ██  ██  ██  ██  ██',
      '      ██████      ██████      ██████      ',
      '██      ██████      ██████      ██████    ',
      '  ██  ██  ██  ██  ██  ██  ██  ██  ██  ██  ',
      '██████      ██████      ██████      ██████',
      '  ██████      ██████      ██████      ████',
      '██  ██  ██  ██  ██  ██  ██  ██  ██  ██  ██',
      '      ██████      ██████      ██████      ',
      '██      ██████      ██████      ██████    ',
      '  ██  ██  ██  ██  ██  ██  ██  ██  ██  ██  ',
      '██████      ██████      ██████      ██████',
      '  ██████      ██████      ██████      ████',
      '██  ██  ██  ██  ██  ██  ██  ██  ██  ██  ██',
      '      ██████      ██████      ██████      ',
      '██      ██████      ██████      ██████    ',
    ]);
  });
});

function getEmptyMatrix(size: number): number[][] {
  return Array.from({ length: size }, () => Array(size).fill(0));
}

function applyMask(
  matrix: number[][],
  maskPattern: (x: number, y: number) => boolean,
): void {
  for (let y = 0; y < matrix.length; y++) {
    for (let x = 0; x < matrix[y].length; x++) {
      if (maskPattern(x, y)) {
        matrix[y][x] ^= 1; // Toggle the square color
      }
    }
  }
}

function arrayToQRArray(array: number[][]): string[] {
  return array.map((row) => row.map((cell) => (cell ? '██' : '  ')).join(''));
}
