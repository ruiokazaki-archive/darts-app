import { defineConfig } from 'vitest/config';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [],
  test: {
    coverage: {
      provider: 'v8',
      include: ['{app,common,components,lib}/**/*.{js,ts}'],
      exclude: ['app/api/**/*.{js,ts}'],
    },
  },
});
