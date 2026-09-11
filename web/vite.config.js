import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig(({ mode }) => ({
  plugins: [react()],
  // 生产构建部署在 GitHub Pages 子路径 /code-library/；本地 dev 仍用根路径，
  // 保证 http://localhost:5174/browse 这类既有访问习惯不受影响。
  base: mode === 'production' ? '/code-library/' : '/',
  server: { port: 5174, host: true },
}))
