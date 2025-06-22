/**
 * @fileoverview
 * This module implements a Bose–Chaudhuri–Hocquenghem (BCH) code generator in TypeScript.
 * BCH codes are a class of cyclic error-correcting codes that are constructed using polynomials over finite fields.
 * This implementation provides functionality to generate BCH codewords from input data, given the code parameters.
 */

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
  const remainder = polynomialMod2Division(message, generatorPoly);

  // Step 3: Construct the codeword by replacing the last n-k bits of the message with the remainder
  const codeword: number[] = data.concat(remainder);

  return codeword;
}

/**
 * Performs polynomial division over GF(2) (binary field).
 * Returns the remainder after dividing dividend by divisor.
 *
 * @param {number[]} dividend - The dividend polynomial coefficients (in descending order).
 * @param {number[]} divisor - The divisor polynomial coefficients (in descending order).
 * @returns {number[]} The remainder polynomial coefficients (length = divisor.length - 1).
 *
 * @example
 * // Dividing [1,0,1,1,0,0,0] by [1,0,1,1]
 * // Returns [0,1,0]
 */
export function polynomialMod2Division(
  dividend: number[],
  divisor: number[],
): number[] {
  // Make a copy of the dividend to avoid mutating the input
  const remainder = dividend.slice();

  // The degree of the divisor
  const divisorDegree = divisor.length - 1;

  // Perform division
  for (let i = 0; i <= remainder.length - divisor.length; i++) {
    // If the current coefficient is 1, perform XOR with the divisor
    if (remainder[i] === 1) {
      for (let j = 0; j < divisor.length; j++) {
        remainder[i + j] ^= divisor[j];
      }
    }
  }

  // The remainder is the last (divisor.length - 1) coefficients
  return remainder.slice(-divisorDegree);
}
