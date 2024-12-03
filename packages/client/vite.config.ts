import { defineConfig } from 'vite'
import tsconfigPaths from 'vite-tsconfig-paths';

import { TanStackRouterVite } from '@tanstack/router-vite-plugin'
import { viteStaticCopy } from 'vite-plugin-static-copy';

import react from '@vitejs/plugin-react-swc'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    react(),
    TanStackRouterVite(),
    tsconfigPaths(),
    viteStaticCopy({
      targets: [
        {
          src: './public/locales',
          dest: ''
        }
      ]
    })
  ],
})
