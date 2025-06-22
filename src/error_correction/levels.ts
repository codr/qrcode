export enum ErrorCorrectionLevel {
  L = 'L', // Low
  M = 'M', // Medium
  Q = 'Q', // Quartile
  H = 'H', // High
}

export function getErrorCorrectionLevelBits(
  level: ErrorCorrectionLevel,
): number {
  switch (level) {
    case ErrorCorrectionLevel.L:
      return 0b01; // 01 for Low
    case ErrorCorrectionLevel.M:
      return 0b00; // 00 for Medium
    case ErrorCorrectionLevel.Q:
      return 0b11; // 11 for Quartile
    case ErrorCorrectionLevel.H:
      return 0b10; // 10 for High
    default:
      throw new Error(`Unknown error correction level: ${level}`);
  }
}
