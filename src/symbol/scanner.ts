import { getAlignmentPatternPositions } from './alignment_pattern';

/**
 * Generator function that scans a QR code's message space.
 * It yields the coordinates of each message square in the QR code.
 * The coordinates are yielded as tuples [x, y], where x is the column and y is the row.
 */
export function scanner(size: number): Generator<[number, number], void, void> {
  const version = Math.floor((size - 17) / 4);
  if ((size - 1) % 4)
    throw new Error(
      `Invalid QR code size: ${size}. Size must be 4n + 1, where n is a positive integer.`,
    );
  if (version < 1 || version > 40)
    throw new Error(
      `Invalid QR code version: ${version}. Version must be between 1 and 40.`,
    );

  function isAnAlignmentSquare(x: number, y: number): boolean {
    for (const [column, row] of getAlignmentPatternPositions(size)) {
      if (
        // it's in an alignment column.
        column - 2 <= x &&
        x <= column + 2 &&
        // it's in an alignment row.
        row - 2 <= y &&
        y <= row + 2
      ) {
        return true; // x,y is at an alignment pattern.
      }
    }
    return false; // x,y is not at an alignment pattern.
  }

  function isAMessageSquare(x: number, y: number): boolean {
    if (y === 6 || x === 6) return false; // Skip the timing strips.
    if (x < 9 && y < 9) return false; // Skip the top right finder pattern.
    if (x < 9 && y >= size - 8) return false; // Skip the bottom right finder pattern.
    if (x >= size - 8 && y < 9) return false; // Skip the top left finder pattern.
    if (isAnAlignmentSquare(x, y)) return false; // Skip the alignment patterns.

    // TODO(codr): account for format information which is irregularly placed in version 7 and larger QR codes.

    return true;
  }

  function* scannerIterable(): Generator<[number, number], void, void> {
    let x = size - 1;
    let y = size - 1;

    while (x >= 0 && y >= 0) {
      yield [x, y];
      // Check if we are within bounds
      if (x < 0 || x >= size || y < 0 || y >= size) {
        throw new RangeError('Cursor out of bounds');
      }

      /**
       * see https://en.wikipedia.org/wiki/QR_code#/media/File:QR_Character_Placement.svg
       */
      const innerSift = () => {
        // Pretend the cursor is moved if we're passed the first timing strip.
        const xOffset = x > 6 ? -1 : 0;
        // Every other column of 2 bits alternates direction.
        const verticalDirection = (x + xOffset) % 4 < 2 ? 1 : -1;

        if ((x + xOffset) % 2 === 1) {
          // move to the left
          x--;
        } else if (
          // at the top and moving upwards
          (y === 0 && verticalDirection === -1) ||
          // at the bottom and moving downwards
          (y === size - 1 && verticalDirection === 1)
        ) {
          // move left by 1, starting the next column.
          x--;
        } else {
          // move vertically and to the right
          x++;
          y += verticalDirection;
        }
      };

      // Shift at least once, then continue shifting until we find a message square or run out of bounds.
      do {
        if (x < 0 || y < 0) return; // Out of bounds, stop sifting.
        innerSift();
      } while (!isAMessageSquare(x, y));
    }
  }
  return scannerIterable();
}
