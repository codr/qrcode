const FINDER_PATTERN = [
  [1, 1, 1, 1, 1, 1, 1],
  [1, 0, 0, 0, 0, 0, 1],
  [1, 0, 1, 1, 1, 0, 1],
  [1, 0, 1, 0, 1, 0, 1],
  [1, 0, 1, 1, 1, 0, 1],
  [1, 0, 0, 0, 0, 0, 1],
  [1, 1, 1, 1, 1, 1, 1],
];
const FINDER_SIZE = 7;

/**
 * Given a matrix of 1s and 0s, applies the finder pattern to the corners.
 * This will later the provided array.
 */
export function applyFinderPattern(matrix: number[][]): void {
  const size = matrix.length;
  const positions = [
    [0, 0],
    [0, size - FINDER_SIZE],
    [size - FINDER_SIZE, 0],
  ];
  // Place finder patterns in the corners
  for (const [xOffset, yOffset] of positions) {
    for (let y = 0; y < FINDER_SIZE; y++) {
      for (let x = 0; x < FINDER_SIZE; x++) {
        matrix[y + yOffset][x + xOffset] = FINDER_PATTERN[y][x];
      }
    }
  }
}
