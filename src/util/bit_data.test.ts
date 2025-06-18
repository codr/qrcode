import { describe, it, expect } from 'vitest';
import { BitData } from './bit_data';

/**
 * Helper function to create a BitData with a given size in bytes.
 * @param size Number of bytes for the underlying ArrayBuffer.
 * @returns BitData instance.
 */
function createBitDataView(size: number): BitData {
  return new BitData(size);
}

describe('BitData', () => {
  it('appends and reads a single 4-bit value', () => {
    // Arrange: Create a BitData with 1 byte (8 bits) of storage.
    const view = createBitDataView(1);

    // Act: Append a 4-bit value (e.g., 0b1010 = 10).
    view.appendUint4(0b1010);

    // Assert: The first nibble of the first byte is 0b1010.
    const bytes = view.getUint8Array();
    expect(bytes[0]).toBe(0b10100000);
  });

  it('appends and reads two 4-bit values', () => {
    // Arrange
    const view = createBitDataView(1);

    // Act: Append two 4-bit values.
    view.appendUint4(0b1100); // First nibble
    view.appendUint4(0b0011); // Second nibble

    // Assert: The first byte is 0b11000011
    const bytes = view.getUint8Array();
    expect(bytes[0]).toBe(0b11000011);
  });

  it('throws when appending a 4-bit value out of range', () => {
    const view = createBitDataView(1);

    // Act & Assert: Value > 15
    expect(() => view.appendUint4(16)).toThrow(RangeError);

    // Act & Assert: Value < 0
    expect(() => view.appendUint4(-1)).toThrow(RangeError);
  });

  it('throws when appending 4-bits overflows the buffer', () => {
    // Arrange: 1 byte buffer, can only fit 2 nibbles (8 bits)
    const view = createBitDataView(1);

    // Act: Fill the buffer
    view.appendUint4(1);
    view.appendUint4(2);

    // Assert: Next append throws
    expect(() => view.appendUint4(3)).toThrow(RangeError);
  });

  it('appends a string as a sequence of 4-bit values', () => {
    // Arrange: Each character will be split and charCodeAt(0) used for each char
    const view = createBitDataView(4);

    // Act: Append a string
    view.appendString('A');

    // Assert
    const bytes = view.getUint8Array();
    expect(bytes[0]).toBe('A'.charCodeAt(0));
  });

  it('appends and reads a Uint8Array', () => {
    // Arrange: 2 bytes buffer
    const view = createBitDataView(2);
    const data = new Uint8Array([0x12, 0x34]);

    // Act: Append the data
    view.appendUint8Array(data);

    // Assert: Both bytes match
    const bytes = view.getUint8Array();
    expect(bytes[0]).toBe(0x12);
    expect(bytes[1]).toBe(0x34);
  });

  it('throws when appending Uint8Array overflows the buffer', () => {
    // Arrange: 1 byte buffer, 2 bytes data
    const view = createBitDataView(1);
    const data = new Uint8Array([0x12, 0x34]);

    // Act & Assert
    expect(() => view.appendUint8Array(data)).toThrow(RangeError);
  });

  it('handles appending data when bitCursor is not byte-aligned', () => {
    // Arrange: 2 bytes buffer
    const view = createBitDataView(2);

    // Act: Append a 4-bit value, then a byte
    view.appendUint4(0b1111); // bitCursor = 4
    view.appendUint8Array(new Uint8Array([0b10101010])); // Should be written starting at bit 4

    // Assert
    const bytes = view.getUint8Array();
    expect(bytes[0]).toBe(0b11111010);
    expect(bytes[1]).toBe(0b10100000);
  });
});
