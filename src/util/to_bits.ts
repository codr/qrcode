/**  Converts a number to an array of bits. */
export const toBits =
  (bits: number) =>
  (input: number): number[] =>
    [...Array(bits)].map((_, index) => (input >> (bits - 1 - index)) & 1);
