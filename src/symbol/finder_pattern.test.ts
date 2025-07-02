import { describe, it, expect } from 'vitest';

import { applyFinderPattern } from './finder_pattern';

/**
 * Helper function to create an empty matrix of the given size.
 * Each cell is initialized to 0.
 * @param size - The width and height of the square matrix.
 * @returns A 2D array representing the matrix.
 */
function createEmptyMatrix(size: number): number[][] {
  const matrix: number[][] = [];
  for (let i = 0; i < size; i++) {
    const row: number[] = [];
    for (let j = 0; j < size; j++) {
      row.push(0);
    }
    matrix.push(row);
  }
  return matrix;
}

describe('applyFinderPattern', () => {
  /**
   * Test that the function modifies the matrix in-place and places finder patterns
   * in the expected positions for a standard QR code matrix size (e.g., 21x21).
   */
  it('applies the finder patterns to a 21x21 matrix', () => {
    // Arrange: Create a 21x21 empty matrix
    const matrix = createEmptyMatrix(21);

    // Act: Apply the finder patterns
    applyFinderPattern(matrix);

    // Assert: Check the expected pattern in the matrix
    expect(matrix.map((a) => a.join(''))).toEqual([
      '111111100000001111111',
      '100000100000001000001',
      '101110100000001011101',
      '101110100000001011101',
      '101110100000001011101',
      '100000100000001000001',
      '111111100000001111111',
      '000000000000000000000',
      '000000000000000000000',
      '000000000000000000000',
      '000000000000000000000',
      '000000000000000000000',
      '000000000000000000000',
      '000000000000000000000',
      '111111100000000000000',
      '100000100000000000000',
      '101110100000000000000',
      '101110100000000000000',
      '101110100000000000000',
      '100000100000000000000',
      '111111100000000000000',
    ]);
  });

  /**
   * Test that the function works for larger matrices (e.g., 25x25).
   */
  it('applies the finder patterns to a 25x25 matrix', () => {
    // Arrange: Create a 25x25 empty matrix
    const matrix = createEmptyMatrix(25);

    // Act: Apply the finder patterns
    applyFinderPattern(matrix);

    // Assert: Check the expected pattern in the matrix
    expect(matrix.map((a) => a.join(''))).toEqual([
      '1111111000000000001111111',
      '1000001000000000001000001',
      '1011101000000000001011101',
      '1011101000000000001011101',
      '1011101000000000001011101',
      '1000001000000000001000001',
      '1111111000000000001111111',
      '0000000000000000000000000',
      '0000000000000000000000000',
      '0000000000000000000000000',
      '0000000000000000000000000',
      '0000000000000000000000000',
      '0000000000000000000000000',
      '0000000000000000000000000',
      '0000000000000000000000000',
      '0000000000000000000000000',
      '0000000000000000000000000',
      '0000000000000000000000000',
      '1111111000000000000000000',
      '1000001000000000000000000',
      '1011101000000000000000000',
      '1011101000000000000000000',
      '1011101000000000000000000',
      '1000001000000000000000000',
      '1111111000000000000000000',
    ]);
  });
});
