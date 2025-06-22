import { QRCode } from './qr_code';
import { MicroQRCode } from './micro_qr_code';

export function createFromArray(array: number[][]): QRCode {
  if (array.length < 21) {
    return MicroQRCode.fromArray(array);
  } else {
    return QRCode.fromArray(array);
  }
}
