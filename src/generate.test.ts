import { describe, it, expect } from 'vitest';
import fs from 'fs';
import path from 'path';

import { createFromArray } from './symbol/symbol_factory';
import { generateQR } from './generate';
import { QRCode } from './symbol/qr_code';
import { ErrorCorrectionLevel } from './error_correction/levels';

const v1Example0 = path.join(__dirname, '..', 'data', 'v1_example_0.csv');
const v1Example1Believe = path.join(
  __dirname,
  '..',
  'data',
  'v1_example_1_believe.csv',
);

describe('generateQR', () => {
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

  it('generates a QRCode for `https://code.io`', () => {
    // Arrange
    const csvData = fs.readFileSync(v1Example0, 'utf8');
    const expectedQR = processCSVFile(csvData);

    // Act
    debugger;
    const qrCode = generateQR('https://code.io', ErrorCorrectionLevel.L, 3);

    // Assert
    expect(qrCode.toConsole().split('\n')).toEqualQRArray(
      expectedQR.toConsole().split('\n'),
    );
  });

  it('generates a QRCode for `Believe`', () => {
    // Arrange
    const csvData = fs.readFileSync(v1Example1Believe, 'utf8');
    const expectedQR = processCSVFile(csvData);

    // Act
    const qrCode = generateQR('Believe', ErrorCorrectionLevel.L, 7);

    // Assert
    expect(qrCode.toConsole().split('\n')).toEqualQRArray(
      expectedQR.toConsole().split('\n'),
    );
  });
});

function processCSVFile(data: string) {
  // Process the file content as a CSV into a 2D array
  const lines = data.split('\n').map((line) =>
    line
      .split(',')
      .map((value) => value.trim())
      .map((value) => Number(value)),
  );

  // Create a QRCode instance with the 2D array
  return createFromArray(lines);
}
