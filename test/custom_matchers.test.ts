import { describe, it, expect } from 'vitest';

import './custom_matchers';

/**
 * Helper function to generate a simple QR-like array for testing.
 * @param char The character to fill the QR array with.
 * @returns An array of strings representing a QR code.
 */
function generateQRArray(char: string): string[] {
  return [`${char}${char}${char}`, `${char} ${char}`, `${char}${char}${char}`];
}

describe('Custom Matcher: toEqualQRArray', () => {
  it('should pass when two identical QR arrays are compared', () => {
    // Arrange: Create two identical QR arrays
    const qr1 = generateQRArray('█');
    const qr2 = generateQRArray('█');

    // Act & Assert: The matcher should pass
    expect(qr1).toEqualQRArray(qr2);
  });

  it('should fail when QR arrays differ in content', () => {
    // Arrange: Create two different QR arrays
    const qr1 = generateQRArray('█');
    const qr2 = generateQRArray('░');

    // Act
    // We use a try-catch to verify that the matcher throws an error
    const action = () => {
      expect(qr1).toEqualQRArray(qr2);
    };

    // Assert: Verify that an error was thrown
    expect(action).toThrowError('expected QR arrays to match, but they differ');
  });

  it('should fail when QR arrays differ in length', () => {
    // Arrange: Create QR arrays of different lengths
    const qr1 = ['███', '█ █', '███'];
    const qr2 = ['███', '█ █'];

    // Act
    const action = () => {
      expect(qr1).toEqualQRArray(qr2);
    };

    // Assert: Verify that an error was thrown
    expect(action).toThrowError('expected QR arrays to match, but they differ');
  });

  it('should pass for empty arrays', () => {
    // Arrange: Both arrays are empty
    const qr1: string[] = [];
    const qr2: string[] = [];

    // Act & Assert: The matcher should pass
    expect(qr1).toEqualQRArray(qr2);
  });

  it('should fail when only one array is empty', () => {
    // Arrange: One array is empty, the other is not
    const qr1: string[] = [];
    const qr2: string[] = ['███'];

    // Act
    const action = () => {
      debugger;
      expect(qr1).toEqualQRArray(qr2);
    };

    // Assert: Verify that an error was thrown
    expect(action).toThrowError('expected QR arrays to match, but they differ');
  });
});
