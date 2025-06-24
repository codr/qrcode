const GF_SIZE = 256;
const PRIMITIVE_POLY = 0x11d;
const EXP_TABLE: number[] = new Array(GF_SIZE * 2);
const LOG_TABLE: number[] = new Array(GF_SIZE);

export type Polynomial = readonly number[];

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
  let runningProduct = 1;
  for (let i = 0; i < GF_SIZE - 1; i++) {
    EXP_TABLE[i] = runningProduct;
    LOG_TABLE[runningProduct] = i;
    runningProduct <<= 1;
    if (runningProduct & 0x100) runningProduct ^= PRIMITIVE_POLY;
  }

  // TODO(codr): look at removing this to reduce byte size.
  // Extend exp table so we don't need modulo
  for (let i = GF_SIZE - 1; i < EXP_TABLE.length; i++) {
    EXP_TABLE[i] = EXP_TABLE[i - GF_SIZE + 1];
  }
}
initGaloisTables();

function gfLog(argument: number): number {
  if (argument < 1) throw new Error('log(' + argument + ')');
  return LOG_TABLE[argument];
}

function gfExp(base: number): number {
  return EXP_TABLE[base];
}

/**
 * Multiplies two elements in GF(2^8).
 *
 * Contract:
 * - Accepts two integers a and b, both in the range [0, 255].
 * - Returns the product of a and b in GF(2^8).
 * - If either a or b is 0, returns 0.
 * - No side effects.
 */
function gfMul(multiplicand: number, multiplier: number): number {
  if (multiplicand === 0 || multiplier === 0) return 0;
  return EXP_TABLE[LOG_TABLE[multiplicand] + LOG_TABLE[multiplier]];
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
function gfDiv(dividend: number, divisor: number): number {
  if (divisor === 0) throw new Error('Division by zero');
  if (dividend === 0) return 0;
  return EXP_TABLE[(LOG_TABLE[dividend] + 255 - LOG_TABLE[divisor]) % 255];
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
function polyMul(multiplicand: Polynomial, multiplier: Polynomial): Polynomial {
  const result = new Array(multiplicand.length + multiplier.length - 1); //.fill(0);
  for (let i = 0; i < multiplicand.length; i++) {
    for (let j = 0; j < multiplier.length; j++) {
      result[i + j] ^= gfMul(multiplicand[i], multiplier[j]);
    }
  }
  return result;
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
export function polyMod(dividend: Polynomial, divisor: Polynomial): Polynomial {
  const quotient = [...dividend];
  for (let i = 0; i < quotient.length - divisor.length + 1; i++) {
    const coefficient = quotient[i];
    if (coefficient !== 0) {
      for (let j = 1; j < divisor.length; j++) {
        quotient[i + j] ^= gfMul(divisor[j], coefficient);
      }
    }
  }
  const remainder = quotient.slice(-divisor.length + 1);
  return remainder;
}

/**
 * Generates the generator polynomial for Reed-Solomon encoding.
 *
 * Contract:
 * - Accepts the number of error correction symbols to generate.
 * - Returns an array representing the generator polynomial.
 * - No side effects.
 */
export function generateGeneratorPoly(numberOfSymbols: number): Polynomial {
  let generator: Polynomial = [1];
  for (let i = 0; i < numberOfSymbols; i++) {
    generator = polyMul(generator, [1, EXP_TABLE[i]]);
  }
  return generator;
}

export const TEST_ONLY = {
  gfLog,
  gfExp,
};
