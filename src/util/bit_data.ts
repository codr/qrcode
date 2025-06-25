export class BitData {
  private bitCursor: number = 0;
  private data = 0n;

  constructor(private maxBytes: number) {}

  appendString(value: string): void {
    if (import.meta.env.MODE !== 'nano') {
      if (this.bitCursor + value.length * 8 > this.maxBytes * 8) {
        throw new RangeError(
          'Buffer overflow: not enough space to append string',
        );
      }
    }

    for (let i = 0; i < value.length; i++) {
      const charCode = value.charCodeAt(i);
      this.appendUint8(charCode); // Append each character as an 8-bit value
    }
  }

  /**
   * Contract:
   * - Appends a 4-bit unsigned integer to the BitData.
   *
   * @param value
   * @returns
   */
  appendUint4(value: number): void {
    if (import.meta.env.MODE !== 'nano') {
      if (value < 0 || value > 15) {
        throw new RangeError('Value must be between 0 and 15');
      }
      if (this.bitCursor + 4 > this.maxBytes * 8) {
        throw new RangeError(
          'Buffer overflow: not enough space to append 4 bits',
        );
      }
    }

    this.data <<= 4n; // Shift existing data left by 4 bits
    this.data |= BigInt(value & 0x0f); // Append the new 4-bit value
    this.bitCursor += 4;
  }

  appendUint8(value: number): void {
    if (import.meta.env.MODE !== 'nano') {
      if (value < 0 || value > 255) {
        throw new RangeError('Value must be between 0 and 255');
      }
      if (this.bitCursor + 8 > this.maxBytes * 8) {
        throw new RangeError(
          'Buffer overflow: not enough space to append 8 bits',
        );
      }
    }

    this.data <<= 8n; // Shift existing data left by 8 bits
    this.data |= BigInt(value & 0xff); // Append the new 8-bit value
    this.bitCursor += 8;
  }

  /**
   * Contract:
   * - Appends a Uint8Array to the BitData.
   * - The data is appended starting from the current bitCursor position.
   * - The data array is mutated.
   * @param data The data to append as a Uint8Array.
   */
  appendUint8Array(data: Uint8Array): void {
    if (import.meta.env.MODE !== 'nano') {
      if (this.bitCursor + data.length * 8 > this.maxBytes * 8) {
        throw new RangeError(
          'Buffer overflow: not enough space to append data',
        );
      }
    }

    for (let i = 0; i < data.length; i++) {
      this.appendUint8(data[i]);
    }
  }

  getUint8Array(): Uint8Array {
    const bytes: number[] = [];
    let copy = this.data;
    const mod = this.bitCursor % 8;
    const padding = mod === 0 ? 0 : 8 - mod; // Calculate padding to align to byte
    copy <<= BigInt(padding); // Shift to align to byte
    for (let i = 0; i < Math.ceil(this.bitCursor / 8); i++) {
      bytes.push(Number(copy & 0xffn));
      copy >>= 8n;
    }
    return new Uint8Array(bytes.reverse());
  }

  shiftToByteAligned(): void {
    const mod = this.bitCursor % 8;
    if (mod !== 0) {
      const padding = 8 - mod; // Calculate padding to align to byte
      this.data <<= BigInt(padding); // Shift to align to byte
      this.bitCursor += padding; // Update bit cursor
    }
  }

  getTotalBytes(): number {
    return Math.ceil(this.bitCursor / 8);
  }
}
