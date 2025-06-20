import { expect } from 'vitest';

function arrayDiffer(expected: string[], received: string[]): string[] {
  const diff: string[] = [];
  for (let i = 0; i < expected.length; i++) {
    diff[i] = '';
    if (expected[i] !== received[i]) {
      for (let j = 0; j < expected[i].length; j++) {
        if (received[i] && expected[i][j] === received[i][j]) {
          diff[i] += ' ';
        } else {
          diff[i] += '█';
        }
      }
    }
  }
  return diff;
}

expect.extend({
  toEqualQRArray(received: string[], expected: string[]) {
    const pass =
      received.length === expected.length &&
      received.every((row, index) => row === expected[index]);

    if (pass) {
      return {
        message: () =>
          `expected QR array not to match, but they do:\n` +
          `Received:\n${received.join('\n')}\n`,
        pass: true,
      };
    } else {
      return {
        message: () =>
          `expected QR arrays to match, but they differ:\n` +
          `Received:\n${received.join('\n')}\n` +
          `Difference:\n${arrayDiffer(expected, received).join('\n')}\n` +
          `Expected:\n${expected.join('\n')}\n`,
        pass: false,
      };
    }
  },
});

interface CustomMatchers<R = unknown> {
  toEqualQRArray: (expected: string[]) => R;
}

declare module 'vitest' {
  interface Matchers<T = any> extends CustomMatchers<T> {}
}
