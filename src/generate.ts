import { Encoder } from './encoder/encoder';
import { QRCode } from './symbol/qr_code';
import { createFromArray } from './symbol/symbol_factory';
import { scanner } from './symbol/scanner';
import { formattingMask, getMaskPattern } from './symbol/masks';
import { applyFinderPattern } from './symbol/finder_pattern';
import {
  ErrorCorrectionLevel,
  getErrorCorrectionLevelBits,
} from './error_correction/levels';
import { generateBCHCodeword } from './error_correction/bose_chaudhuri_hocquenghem';

/**
 * Generates a QR code from the given message.
 */
export function generateQR(message: string): QRCode {
  const errorCorrectionLevel = ErrorCorrectionLevel.L; // Default error correction level

  // Step 1. Data Analysis
  // Step 2. Data Encoding
  // Step 3. Error Correction Encoding
  // Step 4. Structure Final Message
  const encoder = new Encoder(message);
  const encodedMessage = encoder.encodeMessage();

  // Step 5. Place message in matrix
  const matrix = placeInMatrix(encodedMessage);

  // Step 6. Data Masking
  const maskPattern = 1; // For simplicity, using mask pattern 1
  applyMask(matrix, maskPattern);

  // Step 7. Format Information
  applyFormatInformation(matrix, errorCorrectionLevel, maskPattern);

  // Return the generated QR code
  return createFromArray(matrix);
}

function placeInMatrix(message: Uint8Array, version = 1): number[][] {
  const size = 21 + (version - 1) * 4; // Calculate size based on version
  const matrix: number[][] = Array.from({ length: size }, () =>
    Array(size).fill(0),
  );

  // Place in matrix using the scanner
  const cursor = scanner(size);
  for (const byte of message) {
    for (const bit of byte.toString(2).padStart(8, '0')) {
      const position = cursor.next();
      if (position.done) {
        throw new Error('Message length exceeds QR code capacity');
      }
      const [x, y] = position.value;
      if (bit === '1') {
        matrix[y][x] = 1; // Set the square to black
      } else {
        matrix[y][x] = 0; // Set the square to white
      }
    }
  }

  // Add timing patterns
  Array.from({ length: size }, (_, i) => {
    matrix[6][i] = i % 2 ? 0 : 1; // Horizontal timing pattern
    matrix[i][6] = i % 2 ? 0 : 1; // Vertical timing pattern
  });

  // Add finder patterns
  applyFinderPattern(matrix);

  // Add alignment patterns
  // TODO(codr): add alignment patterns for larger versions.

  return matrix;
}

function applyMask(
  matrix: number[][],
  maskPattern: 0 | 1 | 2 | 3 | 4 | 5 | 6 | 7,
): void {
  const maskFunction = getMaskPattern(maskPattern);
  for (const [x, y] of scanner(matrix.length)) {
    if (maskFunction(x, y)) {
      matrix[y][x] ^= 1; // Toggle the square color
    }
  }
}

function applyFormatInformation(
  matrix: number[][],
  errorCorrectionLevel: ErrorCorrectionLevel,
  maskPattern: number,
): void {
  let formatInfo = 0b0;

  // Error Correction Level
  const errorCorrectionBits = getErrorCorrectionLevelBits(errorCorrectionLevel);

  formatInfo |= errorCorrectionBits << 3; // Shift to the left by 3 bits

  // Data Mask Pattern
  formatInfo |= maskPattern & 0b111; // Use the last 3 bits for mask pattern

  // Add Error Correction to the format information
  const formatInfoBits = formatInfo.toString(2).padStart(5, '0');
  const formatInfoArray = Array.from(formatInfoBits).map((bit) =>
    bit === '1' ? 1 : 0,
  );
  const formatInfoWithErrorCorrection = generateBCHCodeword(
    formatInfoArray,
    15,
  );

  const formatInfoNumber = parseInt(formatInfoWithErrorCorrection.join(''), 2);

  // Apply mask to the format information
  const formatInfoWithMask =
    (formatInfoNumber ^ formattingMask) & 0b111111111111111;

  const formatInfoWithMaskArray = formatInfoWithMask
    .toString(2)
    .padStart(15, '0')
    .split('')
    .map((bit) => (bit === '1' ? 1 : 0));

  // Apply format information to the matrix in the horizontal strip
  for (const [i, bit] of formatInfoWithMaskArray.entries()) {
    if (i < 6) {
      matrix[8][i] = bit;
    } else if (i === 6) {
      matrix[8][i - 1] = bit;
    } else {
      matrix[8][matrix.length - 15 + i] = bit;
    }
  }

  // Apply format information to the matrix in the vertical strip
  for (const [i, bit] of formatInfoWithMaskArray.reverse().entries()) {
    if (i < 6) {
      matrix[i][8] = bit; // Vertical strip
    } else if (i === 6 || i === 7) {
      matrix[i + 1][8] = bit; // Horizontal strip
    } else {
      matrix[matrix.length - 15 + i][8] = bit; // Vertical strip
    }
  }

  // Add single dark square
  matrix[matrix.length - 8][8] = 1; // Dark square in the center of the format information
}
