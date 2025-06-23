import { ErrorCorrectionLevel } from '../error_correction/levels';
import { encodeReedSolomon } from '../error_correction/reed_solomon_encoder';
import { BitData } from '../util/bit_data';

export enum Encoding {
  Unknown = 'Unknown',
  Numeric = 'Numeric',
  Alphanumeric = 'Alphanumeric',
  Byte = 'Byte',
  Kanji = 'Kanji',
}

const MESSAGE_PADDING_ODD = 0b11101100;
const MESSAGE_PADDING_EVEN = 0b00010001;

/**
 * Encoder class for generating QR codes from raw payloads.
 *
 * This follows this order of operations:
 * 1. Determine the encoding type based on the payload.
 * 2. Calculate the minimum size for the encoding.
 * 3. Add
 */
export class Encoder {
  readonly encoding: Encoding;

  constructor(
    private rawPayload: string,
    private errorCorrectionLevel = ErrorCorrectionLevel.L,
    encoding?: Encoding,
  ) {
    // 1. Determine the encoding type based on the payload.
    this.encoding = encoding || this.determineEncoding(rawPayload);
  }

  encodeMessage(): Uint8Array {
    // 2. Calculate the minimum version for the encoding.
    const version = this.calculateMinimumVersion(
      this.encoding,
      this.rawPayload.length,
    );

    // 3. Determine the number of error correction codewords needed.
    const errorCorrectionSize = this.calculateErrorCorrectionSize(version);

    // 4. Create the data codewords.
    let encodingBits = 0b0100; // Default to Byte encoding
    let max = 26; // 26 bytes in version 1. See Table 1 on page 19.
    let view = new BitData(max);
    view.appendUint4(encodingBits); // Set the first byte with the encoding type
    view.appendUint4(this.rawPayload.length >> 4); // Set the second byte to 0 (version 1)
    view.appendUint4(this.rawPayload.length & 0x0f); // Set the third byte to the length of the payload
    view.appendString(this.rawPayload); // Append the raw payload as a string
    view.shiftToByteAligned();

    // Fill remaining bits with padding.
    this.fillWithPadding(view, version);

    const dataCodewords = this.createDataCodewords(view, errorCorrectionSize);
    view.appendUint8Array(new Uint8Array(dataCodewords)); // Append the data codewords

    // 5. Return the final byte array.
    return view.getUint8Array();
  }

  private fillWithPadding(view: BitData, version: number | string): void {
    const totalSize = 19; // Version 1-L has 19 bytes of data capacity. See Table 7 on page 33.
    const bytesToFill = totalSize - view.getTotalBytes();

    for (let i = 0; i < bytesToFill; i++) {
      if (view.getTotalBytes() % 2 === 0) {
        view.appendUint8(MESSAGE_PADDING_EVEN);
      } else {
        view.appendUint8(MESSAGE_PADDING_ODD);
      }
    }
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
    return 7; // Placeholder for now. For 1L, see Table 9 on page 38.
  }

  private createDataCodewords(
    data: BitData,
    errorCorrectionSize: number,
  ): number[] {
    const message = Array.from(data.getUint8Array());
    return encodeReedSolomon(message, errorCorrectionSize);
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
  if (payloadLength <= 17) return 1;

  // TODO(codr): add more error correction levels.

  if (payloadLength > 2953)
    throw new Error(
      `Payload length is too long for byte encoding with low error correction: ${payloadLength}`,
    );
  throw new Error(`Payload not yet implemented: ${payloadLength}`);
}

// Only for testing purposes, to expose constants.
export const TESTING_ONLY = {
  MESSAGE_PADDING_ODD,
  MESSAGE_PADDING_EVEN,
};
