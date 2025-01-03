import * as path from 'node:path'
import react from '@vitejs/plugin-react'
import { defineConfig, loadEnv, ProxyOptions } from 'vite'
import { apiRoutes } from './src/common/enums.ts'

// https://vite.dev/config/

export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd())

  const proxy: Record<string, string | ProxyOptions> | undefined = {}
  for (const route of Object.keys(apiRoutes)) {
    proxy[route] = {
      target: env.VITE_API_URL,
      changeOrigin: true,
      secure: false,
    }
  }

  return {
    plugins: [react()],
    resolve: {
      alias: { '@': path.resolve(__dirname, 'src').replace(/\\/g, '/') },
    },
    server: {
      proxy,
    },
  }
})
