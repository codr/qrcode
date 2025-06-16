import { describe, it, expect } from 'vitest';

import { encodeReedSolomon } from './reed_solomon_encoder';

describe('encodeReedSolomon', () => {
  it('should generate correct number of error correction codewords', () => {
    // Arrange
    const parity = 5;
    const data = [1, 2, 3, 4, 5];

    // Act
    const output = encodeReedSolomon(data, parity);

    // Assert
    expect(output.length).toBe(10);
  });

  it('should return all zeros for empty data', () => {
    // Arrange
    const parity = 4;
    const data: number[] = [];

    // Act
    const output = encodeReedSolomon(data, parity);

    // Assert
    expect(output).toEqual([0, 0, 0, 0]);
  });

  it('should return all zeros for zero data', () => {
    // Arrange
    const parity = 3;
    const data = [0, 0, 0, 0];

    // Act
    const output = encodeReedSolomon(data, parity);

    // Assert
    expect(output).toEqual([0, 0, 0, 0, 0, 0, 0]);
  });

  it('should produce consistent results for the same input', () => {
    // Arrange
    const parity = 2;
    const data = [10, 20, 30];

    // Act
    const output1 = encodeReedSolomon(data, parity);
    const output2 = encodeReedSolomon(data, parity);

    // Assert
    expect(output1).toEqual(output2);
  });

  const testCases = [
    {
      data: [1, 2, 3],
      parity: 2,
      expected: [1, 2, 3, 140, 255],
    },
    {
      data: [32, 91, 11, 120],
      parity: 3,
      expected: [32, 91, 11, 120, 98, 200, 10],
    },
    {
      data: [99, 111, 100, 114, 46, 105, 111],
      parity: 5,
      expected: [99, 111, 100, 114, 46, 105, 111, 237, 117, 86, 118, 242],
    },
  ];

  it.each(testCases)(
    'should produce expected codewords for $data with degree $parity',
    ({ data, parity, expected }) => {
      // Act
      const output = encodeReedSolomon(data, parity);

      // Assert
      expect(output).toEqual(expected);
    },
  );
});
