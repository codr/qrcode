/**
 * @fileoverview Minimal Reed-Solomon encoder for GF(2^8), suitable for QR code error correction
 */

const GF_SIZE = 256;
const PRIMITIVE_POLY = 0x11d;
const EXP_TABLE: number[] = new Array(GF_SIZE * 2);
const LOG_TABLE: number[] = new Array(GF_SIZE);

function initGaloisTables(): void {
  let x = 1;
  for (let i = 0; i < GF_SIZE; i++) {
    EXP_TABLE[i] = x;
    LOG_TABLE[x] = i;
    x <<= 1;
    if (x & 0x100) x ^= PRIMITIVE_POLY;
  }

  // Extend exp table so we don't need modulo
  for (let i = GF_SIZE; i < EXP_TABLE.length; i++) {
    EXP_TABLE[i] = EXP_TABLE[i - GF_SIZE];
  }
}

initGaloisTables();

function gfMul(a: number, b: number): number {
  if (a === 0 || b === 0) return 0;
  return EXP_TABLE[LOG_TABLE[a] + LOG_TABLE[b]];
}

function gfDiv(a: number, b: number): number {
  if (b === 0) throw new Error('Division by zero');
  if (a === 0) return 0;
  return EXP_TABLE[(LOG_TABLE[a] + 255 - LOG_TABLE[b]) % 255];
}

function polyMul(a: number[], b: number[]): number[] {
  const result = new Array(a.length + b.length - 1).fill(0);
  for (let i = 0; i < a.length; i++) {
    for (let j = 0; j < b.length; j++) {
      result[i + j] ^= gfMul(a[i], b[j]);
    }
  }
  return result;
}

function generateGeneratorPoly(numberOfSymbols: number): number[] {
  let g = [1];
  for (let i = 0; i < numberOfSymbols; i++) {
    g = polyMul(g, [1, EXP_TABLE[i]]);
  }
  return g;
}

function polyDiv(
  dividend: number[],
  divisor: number[],
): { remainder: number[] } {
  dividend = [...dividend];
  for (let i = 0; i < dividend.length - divisor.length + 1; i++) {
    const coefficient = dividend[i];
    if (coefficient !== 0) {
      for (let j = 1; j < divisor.length; j++) {
        dividend[i + j] ^= gfMul(divisor[j], coefficient);
      }
    }
  }
  const remainder = dividend.slice(-divisor.length + 1);
  return { remainder };
}

/**
 *
 * @param message The message to encode
 * @param numberOfSymbols The number of error correction symbols to generate
 * @returns
 */
export function encodeReedSolomon(
  message: number[],
  numberOfSymbols: number,
): number[] {
  const gen = generateGeneratorPoly(numberOfSymbols);
  const padded = [...message, ...new Array(numberOfSymbols).fill(0)];
  const { remainder } = polyDiv(padded, gen);
  return [...message, ...remainder];
}
