import { defineConfig } from 'vite'
import viteReact from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

import { TanStackRouterVite } from '@tanstack/router-plugin/vite'
import { resolve } from 'node:path'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    TanStackRouterVite({ autoCodeSplitting: true }),
    viteReact(),
    tailwindcss(),
  ],
  server: {
    proxy: {
      // ? Login to Uabc (https://alumnos.uabc.mx/web/alumnos/entrada)
      '/uabc/login': {
        target: 'https://alumnos.uabc.mx/web/alumnos/entrada',
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api\/uabc/, ''),
        secure: false // ? This is necessary to avoid CORS errors from the Uabc Portal
      },
      // ? Consume the Uabc API (https://alumnos.uabc.mx/group/alumnos/${informacion-personal,informacion-academica,etc...})
      '/uabc/info/': {
        target: 'https://alumnos.uabc.mx/group/alumnos/',
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api\/uabc/, ''),
        secure: false
      },
    }
  },
  resolve: {
    alias: {
      '@': resolve(__dirname, './src'),
    },
  },
})
