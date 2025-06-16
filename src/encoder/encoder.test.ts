import { describe, it, expect } from 'vitest';

import { Encoder } from './encoder';

describe('Encoder', () => {
  it('should instantiate with a payload', () => {
    const encoder = new Encoder('hello');
    expect(encoder).toBeInstanceOf(Encoder);
  });

  it('encodeMessage should return Uint8Array', () => {
    const encoder = new Encoder('test');
    const result = encoder.encodeMessage();
    expect(result).toBeInstanceOf(Uint8Array);
  });

  it('should throw error for too long payload', () => {
    const longPayload = 'a'.repeat(3000);
    const encoder = new Encoder(longPayload);
    expect(() => encoder.encodeMessage()).toThrow(
      /Payload length is too long for byte encoding with low error correction/,
    );
  });

  it('should throw error for not yet implemented payload length', () => {
    const encoder = new Encoder('a'.repeat(20));
    expect(() => encoder.encodeMessage()).toThrow(
      /Payload not yet implemented/,
    );
  });

  it('should return expected result for encoding "codr.io"', () => {
    const encoder = new Encoder('codr.io');
    const result = encoder.encodeMessage();
    // Placeholder: update this expected value when implementation is ready
    expect(Array.from(result)).toEqual([]);
  });
});
