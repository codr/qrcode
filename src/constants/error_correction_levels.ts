export enum ErrorCorrectionLevel {
  L = 'Low',
  M = 'Medium',
  Q = 'Quartile',
  H = 'High',
}

export type ErrorCorrectionLevelBits = 0b00 | 0b01 | 0b10 | 0b11;

const ERROR_CORRECTION_LEVEL_BITS: Record<
  ErrorCorrectionLevel,
  ErrorCorrectionLevelBits
> = {
  [ErrorCorrectionLevel.L]: 0b01, // 01 for Low
  [ErrorCorrectionLevel.M]: 0b00, // 00 for Medium
  [ErrorCorrectionLevel.Q]: 0b11, // 11 for Quartile
  [ErrorCorrectionLevel.H]: 0b10, // 10 for High
};

export function getErrorCorrectionLevelBits(
  level: ErrorCorrectionLevel,
): ErrorCorrectionLevelBits {
  return ERROR_CORRECTION_LEVEL_BITS[level];
}
