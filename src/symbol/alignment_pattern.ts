export function alignmentPatternCount(size: number): number {
  if (size < 25) {
    // version 1 does not have alignment patterns.
    return 0;
  }
  return columnsAndRowsCount(size) * columnsAndRowsCount(size) - 3;
}

export function columnsAndRowsCount(size: number): number {
  if (size < 25) {
    // version 1 does not have alignment patterns.
    return 1;
  }
  return Math.floor((size + 41) / 28);
}

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
