/**
 * @fileoverview
 * The tests focus on observable behavior of the Scanner class for a QR code.
 * This file contains unit tests for the Scanner class defined in scanner.ts.
 */

import { describe, it, expect } from 'vitest';

import { scanner } from './scanner';

describe('scanner', () => {
  describe('constructor', () => {
    it('should initialize with correct cursor position', () => {
      const cursor = scanner(21);

      const position = cursor.next().value;

      expect(position).toEqual([20, 20]);
    });

    it('should throw an error for invalid size (not 4n + 1)', () => {
      // Size 22 is invalid because (22 - 1) % 4 !== 0
      expect(() => scanner(22)).toThrowError(/Invalid QR code size: 22/);
    });

    it('should throw an error for version less than 1', () => {
      // Size 1 is invalid.
      expect(() => scanner(1)).toThrowError(/Invalid QR code version: -4/);
    });

    it('should throw an error for version greater than 40', () => {
      // Size 165 is invalid.
      expect(() => scanner(181)).toThrowError(/Invalid QR code version: 41/);
    });
  });

  describe('iterations', () => {
    it('should return the current cursor position as a tuple', () => {
      const cursor = scanner(21);

      const position = cursor.next().value;

      // expect(Array.isArray(position)).toBe(true);
      expect(position).toBeInstanceOf(Array);
      expect(position).toHaveLength(2);
      expect(typeof (position as number[])[0]).toBe('number');
      expect(typeof (position as number[])[1]).toBe('number');
    });

    it('should traverse the message space of the QR code version 1', () => {
      const squares = new Array(21)
        .fill(null)
        .map(() => new Array(21).fill('  '));

      for (const [x, y] of scanner(21)) {
        squares[y][x] = '██'; // Mark the square as visited
      }

      const actual = squares.map((row) => row.join(''));
      expect(actual).toEqualQRArray([
        // This is a representation of the QR code's message space for version 1.
        '                  ████████                ',
        '                  ████████                ',
        '                  ████████                ',
        '                  ████████                ',
        '                  ████████                ',
        '                  ████████                ',
        '                                          ',
        '                  ████████                ',
        '                  ████████                ',
        '████████████  ████████████████████████████',
        '████████████  ████████████████████████████',
        '████████████  ████████████████████████████',
        '████████████  ████████████████████████████',
        '                  ████████████████████████',
        '                  ████████████████████████',
        '                  ████████████████████████',
        '                  ████████████████████████',
        '                  ████████████████████████',
        '                  ████████████████████████',
        '                  ████████████████████████',
        '                  ████████████████████████',
      ]);
    });

    it('should traverse the message space of the QR code version 2', () => {
      const squares = new Array(25)
        .fill(null)
        .map(() => new Array(25).fill('  '));

      for (const [x, y] of scanner(25)) {
        squares[y][x] = '██'; // Mark the square as visited
      }

      const actual = squares.map((row) => row.join(''));
      expect(actual).toEqualQRArray([
        // This is a representation of the QR code's message space for version 1.
        '                  ████████████████                ',
        '                  ████████████████                ',
        '                  ████████████████                ',
        '                  ████████████████                ',
        '                  ████████████████                ',
        '                  ████████████████                ',
        '                                                  ',
        '                  ████████████████                ',
        '                  ████████████████                ',
        '████████████  ████████████████████████████████████',
        '████████████  ████████████████████████████████████',
        '████████████  ████████████████████████████████████',
        '████████████  ████████████████████████████████████',
        '████████████  ████████████████████████████████████',
        '████████████  ████████████████████████████████████',
        '████████████  ████████████████████████████████████',
        '████████████  ██████████████████          ████████',
        '                  ██████████████          ████████',
        '                  ██████████████          ████████',
        '                  ██████████████          ████████',
        '                  ██████████████          ████████',
        '                  ████████████████████████████████',
        '                  ████████████████████████████████',
        '                  ████████████████████████████████',
        '                  ████████████████████████████████',
      ]);
    });
  });
});
