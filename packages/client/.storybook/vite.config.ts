import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react-swc';
import tsconfigPaths from 'vite-tsconfig-paths';

export default defineConfig({
  plugins: [react(), tsconfigPaths()],
  resolve: {
    alias: {
      '@': '/src',
      '@store': '/src/store',
      '@features': '/src/components/features',
      '@common': '/src/components/common',
      '@assets': '/src/assets'
    }
  }
});