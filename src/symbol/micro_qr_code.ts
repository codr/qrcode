import { QRCode } from './qr_code';
import { ErrorCorrectionLevel } from '../error_correction/levels';
import { MaskPattern } from './masks';

export class MicroQRCode extends QRCode {
  static fromArray(array: number[][]): MicroQRCode {
    return new MicroQRCode(array);
  }

  protected extractErrorCorrectionLevel(): ErrorCorrectionLevel {
    // In Micro QR Codes, the error correction level is always 'L'
    return ErrorCorrectionLevel.L;
  }

  protected extractVersion(): string {
    const width = this.squares[0].length;
    const microVersion = (width - 9) / 2;
    if (microVersion >= 1 && microVersion <= 4) {
      return `M${microVersion}`;
    }
    throw new Error(
      `Invalid QR code version. QR width is ${width}, with does not match a known size.`,
    );
  }

  protected extractMaskPattern(): MaskPattern {
    throw new Error(
      'Micro QR Codes do not use mask patterns like standard QR Codes.',
    );
  }
}
