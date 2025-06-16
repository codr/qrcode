import { QRCode } from './qrcode';
import { MicroQRCode } from './microqrcode';

export function createFromArray(array: number[][]): QRCode {
  if (array.length < 21) {
    return MicroQRCode.fromArray(array);
  } else {
    return QRCode.fromArray(array);
  }
}

function createFromString(string: string): QRCode {
  // 1. Check if Alphanumeric encoding can be used
  // TODO(codr): Implement logic to check if the string can be encoded in Alphanumeric format

  // 2. Use byte encoding if alphanumeric is not possible

  const array = string.split('\n').map((line) =>
    line
      .split(',')
      .map((value) => value.trim())
      .map((value) => Number(value)),
  );
  return createFromArray(array);
}
