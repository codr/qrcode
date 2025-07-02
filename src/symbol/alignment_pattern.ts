import { columnsAndRowsCount } from '../util/alignment';

export function columnsAndRowsPositions(size: number): number[] {
  // Every Version has at least conceptual column and row at 6.
  const result = [6];

  const columnsToSlit = columnsAndRowsCount(size) - 1;
  const maxColumnIndex = size - 1;
  const width = maxColumnIndex - 12;

  // Take up as much space as possible, but ensure that the spacing is even.
  const desiredSpacing = Math.ceil(width / columnsToSlit / 2) * 2;
  const remainingSpace = width - columnsToSlit * desiredSpacing;

  for (let i = 1; i < columnsToSlit; i++) {
    const position = 6 + remainingSpace + desiredSpacing * i;
    result.push(position);
  }

  if (size > 21) {
    result.push(maxColumnIndex - 6);
  }
  return result;
}

/**
 * Calculates the positions of alignment patterns for a QR code of a given size.
 */
export function getAlignmentPatternPositions(size: number): [number, number][] {
  const columnsAndRows = columnsAndRowsPositions(size);
  const positions: [number, number][] = [];

  for (const [i, column] of columnsAndRows.entries()) {
    for (const [j, row] of columnsAndRows.entries()) {
      if (!i && !j) continue; // Skip the first alignment pattern at (6, 6).
      if (!i && j === columnsAndRows.length - 1) continue; // Skip the last alignment pattern in the last row.
      if (!j && i === columnsAndRows.length - 1) continue; // Skip the last alignment pattern in the last column.
      positions.push([column, row]);
    }
  }

  return positions;
}

/**
 * Applies alignment patterns to the QR code matrix.
 */
export function applyAlignmentPattern(matrix: number[][], size: number): void {
  const positions = getAlignmentPatternPositions(size);
  for (const [x, y] of positions) {
    for (let row = -2; row <= 2; row++) {
      for (let col = -2; col <= 2; col++) {
        if (row === -2 || row === 2 || col === -2 || col === 2) {
          matrix[y + row][x + col] = 1; // Outer border
        } else if (row === 0 && col === 0) {
          matrix[y + row][x + col] = 1; // Center square
        } else {
          matrix[y + row][x + col] = 0; // Inner square
        }
      }
    }
  }
}
