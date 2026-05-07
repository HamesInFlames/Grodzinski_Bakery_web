import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { imagetools } from 'vite-imagetools';
import path from 'path';

export default defineConfig({
  plugins: [
    react(),
    imagetools({
      defaultDirectives: (url) => {
        if (url.searchParams.has('product')) {
          return new URLSearchParams('w=400;800;1200&format=avif;webp;jpg&as=picture');
        }
        if (url.searchParams.has('thumb')) {
          return new URLSearchParams('w=200;400&format=webp;jpg&as=picture');
        }
        return new URLSearchParams();
      },
    }),
  ],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
});
