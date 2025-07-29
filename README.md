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
- Final Message - The mode, message size, the message itself, any padding, and error correction
- Data - The input data provided by the user
- Error correction - Reed Solomon error correction codewords.

An example message looks like:
|--------------------------Final Message-------------------------|
|--Mode--|--Data Size--|--Data--|--Padding--|--Error correction--|

## High-level Game Plan

1. Generate QR Codes in JS
2. Build it so that it is as small as possible
3. It in a data-url such that it can fit inside a QR code
   - Version 40 supports 2953 bytes
     - 2953 - 186 = 2767 bytes after compression

Goal: QR code that when read allows the user to generate another QR code.

### Milestones

#### **Phase 1: Complete Core Implementation**

- [x] **Finish Reed-Solomon error correction** - Complete the current implementation you're working on
- [x] **Test basic QR generation** - Verify codes scan correctly with different data inputs
- [ ] **Break up larger error correction** - Codes 5-Q and larger are broken up into blocks
- [ ] **Implement different error correction levels** - L, M, Q, H levels for size vs reliability trade-offs
- [ ] **Add version support** - Handle different QR code sizes (Version 1-40) as needed
- [ ] **Add mask validation** - Evaluate and apply the appropriate mask to the code

#### **Phase 2: Optimization & Compression**

- [ ] **Measure current bundle size** - Baseline your current implementation size
- [ ] **Minify and optimize code** - Remove comments, shorten variable names, optimize algorithms
  - as of 2025/06/25 `npx vite build --mode=nano` shows "5.54 kB │ gzip: 2.49 kB"
  - Areas for improvement
    - [ ] bit_data.ts - Can this not use Uint8Array because this is a symbol that cannot easily be minified
    - [ ] qr_code.ts - Can these be made into function instead of classes? This may minify nicer.
- [ ] **Remove unnecessary features** - Strip down to only essential QR generation functions
- [x] **Optimize Reed-Solomon tables** - Consider pre-computed vs generated tables for size
- [ ] **Test alternative compression** - Try different approaches to hit the ~3kb target

#### **Phase 3: Self-Containment Testing**

- [ ] **Create QR-in-QR proof of concept** - Generate a QR code containing your generator
- [ ] **Test extraction and execution** - Verify the embedded code can be extracted and run
- [ ] **Browser compatibility testing** - Ensure it works across different environments
- [ ] **Error handling** - Add robust error handling for edge cases

#### **Phase 4: Polish & Documentation**

- [ ] **Create demo interface** - Simple web interface to showcase the generator
- [ ] **Add usage examples** - Show different ways to use the self-contained generator
- [ ] **Performance benchmarking** - Compare speed/size with other QR libraries
- [ ] **Write project documentation** - Explain the concept and implementation approach

#### **Phase 5: Share & Iterate**

- [ ] **Deploy demo online** - Host somewhere for others to try
- [ ] **Create project writeup** - Blog post or README explaining the technical challenge
- [ ] **Gather feedback** - Share with developer communities for input
- [ ] **Consider enhancements** - Based on feedback, plan potential improvements

---

**Current Focus:** Reed-Solomon implementation  
**Next Up:** Core functionality testing  
**Target:** Self-contained QR generator ≤ 3kb

## Notes

- [Veritasium video](https://youtu.be/w5ebcowAJD8)
- Consider apply gzip to the data-url
- Test if a mobile phone will open a data URL from a QR code
- Data URL plan: https://leanrada.com/notes/compressing-websites-into-urls/
