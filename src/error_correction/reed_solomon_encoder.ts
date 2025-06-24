/**
 * @fileoverview Minimal Reed-Solomon encoder for GF(2^8), suitable for QR code error correction.
 *
 * This module provides functions for Galois Field arithmetic and Reed-Solomon encoding,
 * which are essential for generating error correction codes in QR code generation.
 */

import { polyMod, generateGeneratorPoly, Polynomial } from './poly_math';

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
): Polynomial {
  const gen = generateGeneratorPoly(numberOfSymbols);
  const padded = [...message, ...new Array(numberOfSymbols).fill(0)];
  const remainder = polyMod(padded, gen);
  return remainder;
}
