import fs from 'fs';
import path from 'path';

import { createFromArray } from './symbol/symbol_factory';

const v1Example0 = path.join(__dirname, '..', 'data', 'v1_example_0.csv');
const m3MicroExample0 = path.join(
  __dirname,
  '..',
  'data',
  'm3_micro_example_0.csv',
);

function printExample(error: NodeJS.ErrnoException | null, data: string): void {
  if (error) {
    console.error('Error reading file:', error);
    return;
  }

  // Process the file content as a CSV into a 2D array
  const lines = data.split('\n').map((line) =>
    line
      .split(',')
      .map((value) => value.trim())
      .map((value) => Number(value)),
  );

  // Create a QRCode instance with the 2D array
  const qrCode = createFromArray(lines);

  // Log the QR code data to the console
  console.log(qrCode.toConsole());
  console.log('');

  console.log('Error Correction Level:', qrCode.getErrorCorrectionLevel());
  console.log('Version:', qrCode.getVersion());
  console.log('Mask Pattern:', qrCode.getMaskPattern());
}

// fs.readFile(v1Example0, 'utf8', printExample);
fs.readFile(m3MicroExample0, 'utf8', printExample);
