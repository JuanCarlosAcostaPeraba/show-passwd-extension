import { defineConfig } from 'tsup';

export default defineConfig((options) => ({
  entry: {
    'content/index': 'src/content/index.ts',
    'background/index': 'src/background/index.ts',
    'ui/index': 'src/ui/index.ts'
  },
  target: 'es2020',
  format: ['esm'],
  splitting: false,
  sourcemap: options.watch,
  clean: true,
  outDir: 'dist',
  dts: false,
  minify: !options.watch,
  define: {
    'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV ?? 'development')
  }
}));
