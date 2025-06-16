import { get } from "http";

type MaskFunction = (x: number, y: number) => boolean;

type MaskPattern = 0 | 1 | 2 | 3 | 4 | 5 | 6 | 7;

export function getMaskPattern(maskPattern: MaskPattern): MaskFunction {
  switch (maskPattern) {
    case 0b000:
      return (x, y) => (x + y) % 2 === 0;
    case 0b001:
      return (x, y) => y % 2 === 0;
    case 0b010:
      return (x, y) => x % 3 === 0;
    case 0b011:
      return (x, y) => (x + y) % 3 === 0;
    case 0b100:
      return (x, y) => Math.floor(y / 2) + Math.floor(x / 3) % 2 === 0;
    case 0b101:
      return (x, y) => ((x * y) % 2 + (x * y) % 3) % 2 === 0;
    case 0b110:
      return (x, y) => ((x * y) % 3 + (x + y) % 2) % 2 === 0;
    case 0b111:
      return (x, y) => ((Math.floor(y / 2) + Math.floor(x / 3)) % 2 + ((x * y) % 3)) % 2 === 0;
    default:
      throw new Error('Invalid mask pattern: ' + maskPattern);
  }
}

type MicroMaskPattern = 0 | 1 | 2 | 3;

export function getMicroMaskPattern(maskPattern: MicroMaskPattern): MaskFunction {
  switch (maskPattern) {
    case 0:
      return getMaskPattern(1);
    case 1:
      return getMaskPattern(4);
    case 2:
      return getMaskPattern(6);
    case 3:
      return getMaskPattern(7);
    default:
      throw new Error('Invalid mask pattern: ' + maskPattern);
  }
}

export const formatingMask = 0b101010000010010;
export const microForamatingMask = 0b100010001000101;


