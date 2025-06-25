export enum ErrorCorrectionLevel {
  L = 'Low',
  M = 'Medium',
  Q = 'Quartile',
  H = 'High',
}

const ERROR_CORRECTION_LEVEL_BITS: Record<ErrorCorrectionLevel, number> = {
  [ErrorCorrectionLevel.L]: 0b01, // 01 for Low
  [ErrorCorrectionLevel.M]: 0b00, // 00 for Medium
  [ErrorCorrectionLevel.Q]: 0b11, // 11 for Quartile
  [ErrorCorrectionLevel.H]: 0b10, // 10 for High
};

export function getErrorCorrectionLevelBits(
  level: ErrorCorrectionLevel,
): number {
  return ERROR_CORRECTION_LEVEL_BITS[level];
}
