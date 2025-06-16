# Genetic QR

### Terminology

- Finder Pattern - A 7x7 box
  ```sh
  ██████████████
  ██          ██
  ██  ██████  ██
  ██  ██████  ██
  ██  ██████  ██
  ██          ██
  ██████████████
  ```
- Timing Pattern - A dotted line. Every QR code will have both a horizontal and vertical strip.
- Alignment Pattern - A 5x5 box. This is on every code Version 2 and higher.
  ```sh
  ██████████
  ██      ██
  ██  ██  ██
  ██      ██
  ██████████
  ```

## High-level Game Plan

1. Generate QR Codes in JS
2. Build it so that it is as small as possible
3. It in a data-url such that it can fit inside a QR code
   - Version 40 supports 2953 bytes

Goal: QR code that when read allows the user to generate another QR code.

### TODO

[ ] Build basic encoding. Low level of error correction, basic masking.
[ ] Build other levels of error correction
[ ] Build other masks

### Milestones

1. Build a generator
2. Build a reader

## Notes

- [Veritasium video](https://youtu.be/w5ebcowAJD8)
- Consider apply gzip to the data-url
- Test if a mobile phone will open a data URL from a QR code
