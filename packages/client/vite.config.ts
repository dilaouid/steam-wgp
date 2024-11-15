import { defineConfig } from 'vite'
import tsconfigPaths from 'vite-tsconfig-paths';

import { TanStackRouterVite } from '@tanstack/router-vite-plugin'
import react from '@vitejs/plugin-react-swc'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    react(),
    TanStackRouterVite(),
    tsconfigPaths()
  ],
})
