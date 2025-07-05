import { describe, it, expect } from 'vitest';
import { toBits } from './to_bits';

describe('toBits', () => {
  it('should convert a number to an array of bits with specified length', () => {
    const to5Bits = toBits(5);
    const to15Bits = toBits(15);

    expect(to5Bits(25)).toEqual([1, 1, 0, 0, 1]);
    expect(to15Bits(12345)).toEqual([
      0, 1, 1, 0, 0, 0, 0, 0, 0, 1, 1, 1, 0, 0, 1,
    ]);
  });

  it('should handle zero input', () => {
    const to5Bits = toBits(5);
    const to15Bits = toBits(15);

    expect(to5Bits(0)).toEqual([0, 0, 0, 0, 0]);
    expect(to15Bits(0)).toEqual([0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]);
  });
});
