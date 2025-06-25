import { defineConfig } from 'vite';
import { visualizer } from 'rollup-plugin-visualizer';
import { viteSingleFile } from 'vite-plugin-singlefile';

export default defineConfig(({ mode }) => {
  if (mode === 'nano') {
    return {
      build: {
        outDir: 'dist', // Output directory
        sourcemap: true, // Optional: generate source maps
        rollupOptions: {
          plugins: [
            visualizer({ open: true, emitFile: true }), // Visualize bundle after build
            viteSingleFile(),
          ],
        },
        modulePreload: {
          polyfill: false,
        },
        define: {
          'import.meta.env.PROD': true, // Set production environment variable
          'import.meta.env.PROD_NANO': true, // Set production environment variable
        },

        minify: 'terser', // Use Terser for minification
        terserOptions: {
          compress: {
            /**
             * Enables all available compress options for maximum minification.
             * This is equivalent to enabling all safe compress options.
             */
            defaults: true,

            /**
             * Removes all console statements (console.log, console.error, etc.).
             */
            drop_console: true,

            /**
             * Removes all debugger statements.
             */
            drop_debugger: true,

            /**
             * Removes unreachable code and unused variables/functions.
             */
            dead_code: true,
            unused: true,

            /**
             * Inlines functions and variables where possible.
             */
            inline: true,

            /**
             * Collapses variables defined but only used once.
             */
            collapse_vars: true,

            /**
             * Joins consecutive statements with the same body into one statement.
             */
            join_vars: true,

            /**
             * Removes function arguments that are not used.
             */
            keep_fargs: false,

            /**
             * Removes function names where possible.
             */
            keep_fnames: false,

            /**
             * Aggressively optimizes boolean expressions.
             */
            booleans_as_integers: true,
          },
          mangle: {
            // Configure mangling options here
            // Set to true to mangle all identifiers (including function names)
            toplevel: true, // Mangle top-level variable and function names
            // Example: reserved: ['myReservedFunction'], // Prevent specific names from being mangled
            /**
             * Mangles (renames) property names, including enum keys.
             * WARNING: This can break code that relies on property names.
             */
            properties: true,

            /**
             * Allows mangling of class names.
             */
            keep_classnames: false,

            /**
             * Allows mangling of function names.
             */
            keep_fnames: false,
          },
          // ... (other terserOptions)
        },
      },
    };
  }

  return {
    build: {
      minify: true,
      outDir: 'dist',
      sourcemap: true,
      rollupOptions: {
        plugins: [visualizer({ open: true, emitFile: true })],
      },
    },
  };
});
