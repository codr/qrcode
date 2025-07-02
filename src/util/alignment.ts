/**
 * Calculates the number of alignment patterns for a QR code based on its size.
 */
export function alignmentPatternCount(size: number): number {
  if (size < 25) return 0; // version 1 does not have alignment patterns.
  const columnsAndRows = columnsAndRowsCount(size);
  return columnsAndRows * columnsAndRows - 3;
}

/**
 * Calculates the number of columns and rows for alignment patterns based on the QR code size.
 */
export function columnsAndRowsCount(size: number): number {
  if (size < 25) return 1; // version 1 does not have alignment patterns.
  return Math.floor((size + 41) / 28);
}
