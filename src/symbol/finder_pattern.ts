export function applyFinderPattern(matrix: number[][]): void {
  const size = matrix.length;
  const positions = [
    [3, 3],
    [3, size - 4],
    [size - 4, 3],
  ];
  // Place finder patterns in the corners
  for (const [xOffset, yOffset] of positions) {
    for (let row = -3; row < 4; row++) {
      for (let col = -3; col < 4; col++) {
        if (row === -3 || row === 3 || col === -3 || col === 3) {
          // Outer border
          matrix[yOffset + row][xOffset + col] = 1;
        } else if (row >= -1 && row <= 1 && col >= -1 && col <= 1) {
          // Center square
          matrix[yOffset + row][xOffset + col] = 1;
        } else {
          // Inner square
          matrix[yOffset + row][xOffset + col] = 0;
        }
      }
    }
  }
}
