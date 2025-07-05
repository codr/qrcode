import { Version, Size } from '../types';

export function versionToSize(version: Version): Size {
  if (!isValidVersion(version)) {
    throw new Error(
      `Version ${version} is out of range. Must be between 1 and 40.`,
    );
  }
  return (21 + (version - 1) * 4) as Size; // Calculate size based on version
}

export function sizeToVersion(size: Size): Version {
  if (!isValidSize(size)) {
    throw new Error(
      `Size ${size} is invalid. Must be between 21 and 177 and a multiple of 4 plus 21.`,
    );
  }
  return (Math.floor((size - 21) / 4) + 1) as Version; // Calculate version based on size
}

export function isValidSize(size: number): size is Size {
  return size >= 21 && size <= 177 && (size - 21) % 4 === 0;
}

function isValidVersion(version: number): version is Version {
  return version >= 1 && version <= 40;
}

/**
 * Generates a range of valid QR code versions from 1 to 40.
 */
export function* versionRange(): Generator<Version> {
  for (let i = 1; i <= 40; i++) {
    yield i as Version;
  }
}
