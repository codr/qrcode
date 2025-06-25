type MaskFunction = (x: number, y: number) => boolean;

export type MaskPattern = 0 | 1 | 2 | 3 | 4 | 5 | 6 | 7;

const PATTERN_MAP: Record<MaskPattern, MaskFunction> = {
  0b000: (x, y) => (x + y) % 2 === 0,
  0b001: (x, y) => y % 2 === 0,
  0b010: (x, y) => x % 3 === 0,
  0b011: (x, y) => (x + y) % 3 === 0,
  0b100: (x, y) => (Math.floor(y / 2) + Math.floor(x / 3)) % 2 === 0,
  0b101: (x, y) => ((y * x) % 2) + ((y * x) % 3) === 0,
  0b110: (x, y) => (((x * y) % 2) + ((x * y) % 3)) % 2 === 0,
  0b111: (x, y) => (((x * y) % 3) + ((x + y) % 2)) % 2 === 0,
};

export function getMaskPattern(maskPattern: MaskPattern): MaskFunction {
  return PATTERN_MAP[maskPattern];
}

type MicroMaskPattern = 0 | 1 | 2 | 3;

const MICRO_PATTERN_MAP: Record<MicroMaskPattern, MaskFunction> = {
  0: getMaskPattern(1),
  1: getMaskPattern(4),
  2: getMaskPattern(6),
  3: getMaskPattern(7),
};

export function getMicroMaskPattern(
  maskPattern: MicroMaskPattern,
): MaskFunction {
  return MICRO_PATTERN_MAP[maskPattern];
}

export const formattingMask = 0b101010000010010;
export const microFormattingMask = 0b100010001000101;
