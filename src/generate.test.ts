import { describe, it, expect } from 'vitest';
import { generateQR } from './generate';
import { QRCode } from './symbol/qr_code';

/**
 * Test suite for the generateQR function.
 */
describe('generateQR', () => {
  /**
   * Basic test to verify that generateQR returns a QRCode instance
   * when called with a simple string message.
   */
  it('generates a QRCode instance for the message "hello world"', () => {
    // Arrange: Define the input message
    const message = 'hello world';

    // Act: Generate the QR code using the generateQR function
    const qrCode = generateQR(message);

    // Assert: The result should be an instance of QRCode
    expect(qrCode).toBeInstanceOf(QRCode);
  });

  it('generates a QRCode instance for an empty message', () => {
    // Arrange: Define the input message as an empty string
    const message = '';

    // Act: Generate the QR code using the generateQR function
    const qrCode = generateQR(message);

    // Assert: The result should be an instance of QRCode
    expect(qrCode).toBeInstanceOf(QRCode);
  });
});
