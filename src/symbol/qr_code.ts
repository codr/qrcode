import { Encoding } from '../encoder/encoder';
import { ErrorCorrectionLevel } from '../error_correction/levels';

/**
 * QRCode class represents a QR code as a 2D array of numbers.
 * Each number can be 0 (white) or 1 (black).
 */
export class QRCode {
  protected squares: number[][];
  private errorCorrectionLevel: ErrorCorrectionLevel;
  private version: string;
  private maskPattern: number;
  private encoding: Encoding;

  constructor(squares: number[][]) {
    this.squares = squares;

    // Validate the input squares
    this.version = this.extractVersion();
    // this.validateFinderPatterns();
    // this.validateTimingPatterns();
    // this.validateAlignmentPatterns();

    // Extract formatting information
    this.errorCorrectionLevel = this.extractErrorCorrectionLevel();
    this.maskPattern = this.extractMaskPattern();

    // Extract encoding information
    this.encoding = this.extractEncoding();
  }

  static fromArray(array: number[][]): QRCode {
    return new QRCode(array);
  }

  getVersion(): string {
    return this.version;
  }

  protected extractVersion(): string {
    const width = this.squares[0].length;
    if (width !== this.squares.length) {
      throw new Error(
        'Invalid QR code squares: QR code must be a square matrix, but was ' +
          width +
          'x' +
          this.squares.length,
      );
    }

    const version = (width - 8 * 2 - 1) / 4;
    if ((version >= 1 && version <= 40) || version % 1 === 0) {
      return `${version}`;
    }

    throw new Error(
      `Invalid QR code version. QR width is ${width}, with does not match a known size.`,
    );
  }

  // gets encoding of the QR code
  getErrorCorrectionLevel(): ErrorCorrectionLevel {
    return this.errorCorrectionLevel;
  }

  protected extractErrorCorrectionLevel(): ErrorCorrectionLevel {
    const highBit = this.squares[8][0];
    const lowBit = this.squares[8][1];
    if (highBit === 1 && lowBit === 1) {
      return ErrorCorrectionLevel.L;
    }
    if (highBit === 1 && lowBit === 0) {
      return ErrorCorrectionLevel.M;
    }
    if (highBit === 0 && lowBit === 1) {
      return ErrorCorrectionLevel.Q;
    }
    if (highBit === 0 && lowBit === 0) {
      return ErrorCorrectionLevel.H;
    }
    throw new Error(
      'Invalid error correction level bits: ' + highBit + ', ' + lowBit,
    );
  }

  getMaskPattern(): number {
    return this.maskPattern;
  }

  protected extractMaskPattern(): number {
    const highBit = this.squares[8][2];
    const middleBit = this.squares[8][3];
    const lowBit = this.squares[8][4];
    // shift the bits to get the mask pattern
    const maskedPattern = (highBit << 2) | (middleBit << 1) | lowBit;
    return maskedPattern ^ 0b101;
  }

  getEncoding(): Encoding {
    return this.encoding;
  }

  private extractEncoding(): Encoding {
    const firstByte =
      this.squares[this.squares.length - 1][this.squares[0].length - 1];
    const secondByte =
      this.squares[this.squares.length - 1][this.squares[0].length - 2];
    const thirdByte =
      this.squares[this.squares.length - 2][this.squares[0].length - 1];
    const fourthByte =
      this.squares[this.squares.length - 2][this.squares[0].length - 2];

    // bitwise OR to get the encoding type
    const encodingBits =
      (firstByte << 3) | (secondByte << 2) | (thirdByte << 1) | fourthByte;
    if (encodingBits === 0b0001) {
      return Encoding.Numeric;
    }
    if (encodingBits === 0b0010) {
      return Encoding.Alphanumeric;
    }
    if (encodingBits === 0b0100) {
      return Encoding.Byte;
    }
    if (encodingBits === 0b1000) {
      return Encoding.Kanji;
    }
    return Encoding.Unknown;
    // throw new Error('Invalid encoding bits: ' + encodingBits + '. Expected one of: 0b0001, 0b0010, 0b0100, 0b1000');
  }

  toConsole(): string {
    return this.squares
      .map((row) => row.map((value) => (value === 1 ? '██' : '  ')).join(''))
      .join('\n');
  }
}
