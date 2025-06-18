import { describe, it, expect } from 'vitest';

import { Encoder, TESTING_ONLY } from './encoder';

const { MESSAGE_PADDING_EVEN, MESSAGE_PADDING_ODD } = TESTING_ONLY;

describe('Encoder', () => {
  it('instantiates with a payload', () => {
    // Arrange
    const payload = 'hello';

    // Act
    const encoder = new Encoder(payload);

    // Assert
    expect(encoder).toBeInstanceOf(Encoder);
  });

  it('encodeMessage returns Uint8Array', () => {
    // Arrange
    const encoder = new Encoder('test');

    // Act
    const result = encoder.encodeMessage();

    // Assert
    expect(result).toBeInstanceOf(Uint8Array);
  });

  it('throws error for too long payload', () => {
    // Arrange
    const longPayload = 'a'.repeat(3000);
    const encoder = new Encoder(longPayload);

    // Act & Assert
    expect(() => encoder.encodeMessage()).toThrow(
      /Payload length is too long for byte encoding with low error correction/,
    );
  });

  it('throws error for not yet implemented payload length', () => {
    // Arrange
    const encoder = new Encoder('a'.repeat(20));

    // Act & Assert
    expect(() => encoder.encodeMessage()).toThrow(
      /Payload not yet implemented/,
    );
  });

  /**
   * Version 1L encoding for "codr.io" will produce this expected byte sequence.
   *
   * Version 1L has data capacity of 26 bytes.
   *  - 19 bytes for data.
   *   - 1.5 bytes for mode and message length.
   *   - 7 bytes for the message itself.
   *   - 0.5 bytes for zero padding.
   *   - 10 bytes for padding.
   *  - 7 bytes for error correction codewords.
   */
  it('returns expected result for encoding "codr.io"', () => {
    // Arrange
    const encoder = new Encoder('codr.io');
    const length = 'codr.io'.length;
    const C = 'c'.charCodeAt(0);
    const O = 'o'.charCodeAt(0);
    const D = 'd'.charCodeAt(0);
    const R = 'r'.charCodeAt(0);
    const I = 'i'.charCodeAt(0);
    const dot = '.'.charCodeAt(0);

    // Act
    const result = encoder.encodeMessage();

    // Assert
    expect(Array.from(result)).toEqual([
      (0b0100 << 4) | highNibble(length),
      (lowNibble(length) << 4) | highNibble(C),
      (lowNibble(C) << 4) | highNibble(O),
      (lowNibble(O) << 4) | highNibble(D),
      (lowNibble(D) << 4) | highNibble(R),
      (lowNibble(R) << 4) | highNibble(dot),
      (lowNibble(dot) << 4) | highNibble(I),
      (lowNibble(I) << 4) | highNibble(O),
      (lowNibble(O) << 4) | 0b0000, // Zero padding,
      MESSAGE_PADDING_ODD,
      MESSAGE_PADDING_EVEN,
      MESSAGE_PADDING_ODD,
      MESSAGE_PADDING_EVEN,
      MESSAGE_PADDING_ODD,
      MESSAGE_PADDING_EVEN,
      MESSAGE_PADDING_ODD,
      MESSAGE_PADDING_EVEN,
      MESSAGE_PADDING_ODD,
      MESSAGE_PADDING_EVEN,
      // 7 Bytes of error correction codewords
      expect.any(Number),
      expect.any(Number),
      expect.any(Number),
      expect.any(Number),
      expect.any(Number),
      expect.any(Number),
      expect.any(Number),
    ]);
  });

  /**
   * Version 1L encoding for "Hello, QR example" will produce this expected byte sequence.
   *
   * Version 1L has data capacity of 26 bytes.
   *  - 19 bytes for data.
   *   - 1.5 bytes for mode and message length.
   *   - 17 bytes for the message itself.
   *   - 0.5 bytes for zero padding.
   *  - 7 bytes for error correction codewords.
   */
  it('returns expected result for encoding "Hello, QR example"', () => {
    // Arrange
    const encoder = new Encoder('Hello, QR example');
    const length = 'Hello, QR example'.length;
    const H = 'H'.charCodeAt(0);
    const E = 'e'.charCodeAt(0);
    const L = 'l'.charCodeAt(0);
    const O = 'o'.charCodeAt(0);
    const comma = ','.charCodeAt(0);
    const space = ' '.charCodeAt(0);
    const Q = 'Q'.charCodeAt(0);
    const R = 'R'.charCodeAt(0);
    const X = 'x'.charCodeAt(0);
    const A = 'a'.charCodeAt(0);
    const M = 'm'.charCodeAt(0);
    const P = 'p'.charCodeAt(0);

    // Act
    const result = encoder.encodeMessage();

    // Assert
    expect(Array.from(result)).toEqual([
      (0b0100 << 4) | highNibble(length),
      (lowNibble(length) << 4) | highNibble(H),
      (lowNibble(H) << 4) | highNibble(E),
      (lowNibble(E) << 4) | highNibble(L),
      (lowNibble(L) << 4) | highNibble(L),
      (lowNibble(L) << 4) | highNibble(O),
      (lowNibble(O) << 4) | highNibble(comma),
      (lowNibble(comma) << 4) | highNibble(space),
      (lowNibble(space) << 4) | highNibble(Q),
      (lowNibble(Q) << 4) | highNibble(R),
      (lowNibble(R) << 4) | highNibble(space),
      (lowNibble(space) << 4) | highNibble(E),
      (lowNibble(E) << 4) | highNibble(X),
      (lowNibble(X) << 4) | highNibble(A),
      (lowNibble(A) << 4) | highNibble(M),
      (lowNibble(M) << 4) | highNibble(P),
      (lowNibble(P) << 4) | highNibble(L),
      (lowNibble(L) << 4) | highNibble(E),
      (lowNibble(E) << 4) | 0b0000, // Zero padding
      // 7 Bytes of error correction codewords
      expect.any(Number),
      expect.any(Number),
      expect.any(Number),
      expect.any(Number),
      expect.any(Number),
      expect.any(Number),
      expect.any(Number),
    ]);
  });
});

function highNibble(value: number): number {
  return (value >> 4) & 0x0f;
}
function lowNibble(value: number): number {
  return value & 0x0f;
}
