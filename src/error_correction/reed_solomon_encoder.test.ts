import { describe, it, expect } from 'vitest';

import { encodeReedSolomon } from './reed_solomon_encoder';

import { TEST_ONLY } from '../encoder/encoder';

const { MESSAGE_PADDING_ODD, MESSAGE_PADDING_EVEN } = TEST_ONLY;

describe('encodeReedSolomon', () => {
  it('should generate correct number of error correction codewords', () => {
    // Arrange
    const parity = 5;
    const data = [1, 2, 3, 4, 5];

    // Act
    const output = encodeReedSolomon(data, parity);

    // Assert
    expect(output.length).toBe(5);
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
    expect(output).toEqual([0, 0, 0]);
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
      expected: [4, 4],
    },
    {
      data: [32, 91, 11, 120],
      parity: 3,
      expected: [145, 166, 63],
    },
    {
      data: [99, 111, 100, 114, 46, 105, 111],
      parity: 5,
      expected: [130, 227, 103, 35, 23],
    },
    /**
     * Example from explanation https://www.thonky.com/qr-code-tutorial/error-correction-coding
     */
    {
      data: [
        0b00100000, 0b01011011, 0b00001011, 0b01111000, 0b11010001, 0b01110010,
        0b11011100, 0b01001101, 0b01000011, 0b01000000, 0b11101100, 0b00010001,
        0b11101100, 0b00010001, 0b11101100, 0b00010001,
      ],
      parity: 10,
      expected: [196, 35, 39, 119, 235, 215, 231, 226, 93, 23],
    },
    /**
     * Real world example
     * "Believe" Version 1-L, using Byte encoding
     * 26 bytes of data, 7 error correction codewords
     *
     * The data is encoded as follows:
     *  - 0100     // encoding type (Byte)
     *  - 00000111 // length of "Believe" (7)
     *  - 01000010 // B
     *  - 01100101 // e
     *  - 01101100 // l
     *  - 01101001 // i
     *  - 01100101 // e
     *  - 01110110 // v
     *  - 01100101 // e
     *  - 0000     // zero padding
     *  - 11101100 // padding
     *  - 00010001 // padding
     *  - 11101100 // padding
     *  - 00010001 // padding
     *  - 11101100 // padding
     *  - 00010001 // padding
     *  - 11101100 // padding
     *  - 00010001 // padding
     *  - 11101100 // padding
     *  - 00010001 // padding
     *  - 10001000 // error correction codewords
     *  - 10110110 // error correction codewords
     *  - 11010000 // error correction codewords
     *  - 00010111 // error correction codewords
     *  - 01111100 // error correction codewords
     *  - 11000100 // error correction codewords
     *  - 11001001 // error correction codewords
     */
    {
      data: [
        0b01000000, // encoding type (Byte) + length
        0b01110100, // length + start of payload
        0b00100110, // payload (B)
        0b01010110, // payload (e)
        0b11000110, // payload (l)
        0b10010110, // payload (i)
        0b01010111, // payload (e)
        0b01100110, // payload (v)
        0b01010000, // payload (e) + zero padding
        MESSAGE_PADDING_ODD, // padding
        MESSAGE_PADDING_EVEN, // padding
        MESSAGE_PADDING_ODD, // padding
        MESSAGE_PADDING_EVEN, // padding
        MESSAGE_PADDING_ODD, // padding
        MESSAGE_PADDING_EVEN, // padding
        MESSAGE_PADDING_ODD, // padding
        MESSAGE_PADDING_EVEN, // padding
        MESSAGE_PADDING_ODD, // padding
        MESSAGE_PADDING_EVEN, // padding
      ],
      parity: 7,
      expected: [
        0b10001000, 0b10110110, 0b11010000, 0b00010111, 0b01111100, 0b11000100,
        0b11001001,
      ],
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
