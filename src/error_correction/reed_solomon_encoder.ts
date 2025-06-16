/**
 * @fileoverview Minimal Reed-Solomon encoder for GF(2^8), suitable for QR code error correction.
 *
 * This module provides functions for Galois Field arithmetic and Reed-Solomon encoding,
 * which are essential for generating error correction codes in QR code generation.
 */

const GF_SIZE = 256;
const PRIMITIVE_POLY = 0x11d;
const EXP_TABLE: number[] = new Array(GF_SIZE * 2);
const LOG_TABLE: number[] = new Array(GF_SIZE);

/**
 * Initializes the Galois Field exponent and logarithm tables for GF(2^8).
 *
 * Contract:
 * - Must be called before any Galois Field arithmetic is performed.
 * - Populates EXP_TABLE and LOG_TABLE with values for fast multiplication/division.
 * - No input parameters.
 * - No return value.
 * - Side effect: modifies EXP_TABLE and LOG_TABLE in place.
 */
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

/**
 * Multiplies two elements in GF(2^8).
 *
 * Contract:
 * - Accepts two integers a and b, both in the range [0, 255].
 * - Returns the product of a and b in GF(2^8).
 * - If either a or b is 0, returns 0.
 * - No side effects.
 */
function gfMul(a: number, b: number): number {
  if (a === 0 || b === 0) return 0;
  return EXP_TABLE[LOG_TABLE[a] + LOG_TABLE[b]];
}

/**
 * Divides two elements in GF(2^8).
 *
 * Contract:
 * - Accepts two integers a and b, both in the range [0, 255].
 * - Returns the result of a divided by b in GF(2^8).
 * - Throws an error if b is 0 (division by zero).
 * - If a is 0, returns 0.
 * - No side effects.
 */
function gfDiv(a: number, b: number): number {
  if (b === 0) throw new Error('Division by zero');
  if (a === 0) return 0;
  return EXP_TABLE[(LOG_TABLE[a] + 255 - LOG_TABLE[b]) % 255];
}

/**
 * Multiplies two polynomials in GF(2^8).
 *
 * Contract:
 * - Accepts two arrays of numbers, a and b, representing polynomials.
 * - Each element must be an integer in the range [0, 255].
 * - Returns a new array representing the product polynomial.
 * - No side effects.
 */
function polyMul(a: number[], b: number[]): number[] {
  const result = new Array(a.length + b.length - 1).fill(0);
  for (let i = 0; i < a.length; i++) {
    for (let j = 0; j < b.length; j++) {
      result[i + j] ^= gfMul(a[i], b[j]);
    }
  }
  return result;
}

/**
 * Generates the generator polynomial for Reed-Solomon encoding.
 *
 * Contract:
 * - Accepts the number of error correction symbols to generate.
 * - Returns an array representing the generator polynomial.
 * - No side effects.
 */
function generateGeneratorPoly(numberOfSymbols: number): number[] {
  let g = [1];
  for (let i = 0; i < numberOfSymbols; i++) {
    g = polyMul(g, [1, EXP_TABLE[i]]);
  }
  return g;
}

/**
 * Divides one polynomial by another in GF(2^8), returning the remainder.
 *
 * Contract:
 * - Accepts two arrays of numbers, dividend and divisor, representing polynomials.
 * - Each element must be an integer in the range [0, 255].
 * - Returns an object containing the remainder polynomial.
 * - No side effects.
 */
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
 * Encodes a message using Reed-Solomon error correction for QR codes.
 *
 * Contract:
 * - Accepts:
 *    - message: an array of numbers (each in [0, 255]) representing the message to encode.
 *    - numberOfSymbols: a positive integer specifying the number of error correction symbols to generate.
 * - Returns a new array of numbers containing the original message followed by the error correction symbols.
 * - Does not modify the input message array.
 * - No side effects.
 *
 * @param message The message to encode
 * @param numberOfSymbols The number of error correction symbols to generate
 * @returns An array containing the original message and the error correction symbols
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
