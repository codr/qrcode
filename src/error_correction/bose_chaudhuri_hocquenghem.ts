/**
 * @fileoverview
 * This module implements a Bose–Chaudhuri–Hocquenghem (BCH) code generator in TypeScript.
 * BCH codes are a class of cyclic error-correcting codes that are constructed using polynomials over finite fields.
 * This implementation provides functionality to generate BCH codewords from input data, given the code parameters.
 */

import { polyMod } from './poly_math';

/**
 * Generates a BCH codeword from the given input data and BCH code parameters.
 * This function assumes binary BCH codes (GF(2)).
 */
export function generateBCHCodeword(
  data: number[],
  n: number,
  generatorPoly: number[] = [1, 0, 1, 0, 0, 1, 1, 0, 1, 1, 1],
): number[] {
  // Step 1: Append n-k zeros to the data to create the message polynomial (left shift)
  const message: number[] = data.slice();
  for (let i = 0; i < n - data.length; i++) {
    message.push(0);
  }

  // Step 2: Perform polynomial division (modulo 2) of the message by the generator polynomial
  // The remainder is the parity bits
  const remainder = polyMod(message, generatorPoly);

  // Step 3: Construct the codeword by replacing the last n-k bits of the message with the remainder
  const codeword: number[] = data.concat(remainder);

  return codeword;
}
