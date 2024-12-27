import * as path from 'node:path'
import react from '@vitejs/plugin-react'
import { defineConfig, ProxyOptions } from 'vite'
import { apiRoutes } from './src/common/enums.ts'

// https://vite.dev/config/

const proxy: Record<string, string | ProxyOptions> | undefined = {}
for (const route of Object.keys(apiRoutes)) {
  proxy[route] = {
    target: 'http://jsonplaceholder.typicode.com',
    changeOrigin: true,
  }
}

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: { '@': path.resolve(__dirname, 'src').replace(/\\/g, '/') },
  },
  server: {
    proxy,
  },
})
