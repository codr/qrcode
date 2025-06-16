import { ErrorCorrectionLevel } from '../error_correction/levels';
import { encodeReedSolomon } from '../error_correction/reed_solomon_encoder';

export enum Encoding {
  Unknown = 'Unknown',
  Numeric = 'Numeric',
  Alphanumeric = 'Alphanumeric',
  Byte = 'Byte',
  Kanji = 'Kanji',
}

/**
 * Encoder class for generating QR codes from raw payloads.
 *
 * This follows this order of operations:
 * 1. Determine the encoding type based on the payload.
 * 2. Calculate the minimum size for the encoding.
 * 3. Add
 */
export class Encoder {
  private correctionLevel = ErrorCorrectionLevel.L; // Default to low error correction level

  constructor(private rawPayload: string) {}

  encodeMessage(): Uint8Array {
    // 1. Determine the encoding type based on the payload.
    const encoding = this.determineEncoding(this.rawPayload);

    // 2. Calculate the minimum version for the encoding.
    const version = this.calculateMinimumVersion(
      encoding,
      this.rawPayload.length,
    );

    // 3. Determine the number of error correction codewords needed.
    const errorCorrectionCodewords = this.calculateErrorCorrectionSize(version);

    // 4. Create the data codewords.
    let data = 0b0100; // Default to Byte encoding
    const dataCodewords = this.createDataCodewords(
      this.rawPayload,
      encoding,
      version,
      errorCorrectionCodewords,
    );

    // Draw the rest of the owl.
    return new Uint8Array();
  }

  private determineEncoding(payload: string): Encoding {
    // TODO(codr): Implement logic to determine the encoding type based on the payload.
    return Encoding.Byte; // Default to Byte encoding for now.
  }

  private calculateMinimumVersion(
    encoding: Encoding,
    payloadLength: number,
  ): number | string {
    switch (encoding) {
      case Encoding.Numeric:
        throw new Error('Numeric encoding not yet implemented');
      case Encoding.Alphanumeric:
        throw new Error('Alphanumeric encoding not yet implemented');
      case Encoding.Byte:
        return minimumVersionForByteEncoding(payloadLength);
      case Encoding.Kanji:
        throw new Error('Kanji encoding not yet implemented');
      default:
        throw new Error('Unknown encoding type: ' + encoding);
    }
  }

  private calculateErrorCorrectionSize(size: number | string): number {
    // TODO(codr): Implement logic to calculate the number of error correction codewords needed.
    // This will depend on the error correction level and the size of the QR code.
    return 7; // Placeholder for now.
  }

  private createDataCodewords(
    data: string,
    encoding: Encoding,
    version: number | string,
    errorCorrectionCodewords: number,
  ): number[] {
    const message = data.split('').map((char) => char.charCodeAt(0));
    return encodeReedSolomon(message, errorCorrectionCodewords);
  }
}

function minimumVersionForByteEncoding(payloadLength: number): number | string {
  // TODO(codr): add more error correction levels.
  return minimumVersionForByteEncodingWithLowErrorCorrection(payloadLength);
}

function minimumVersionForByteEncodingWithLowErrorCorrection(
  payloadLength: number,
): number | string {
  // TODO(codr): add proper size calculation based on payload length.
  //             See Table 7 on page 33.
  if (payloadLength < 17) return 1;

  // TODO(codr): add more error correction levels.

  if (payloadLength > 2953)
    throw new Error(
      `Payload length is too long for byte encoding with low error correction: ${payloadLength}`,
    );
  throw new Error(`Payload not yet implemented: ${payloadLength}`);
}
