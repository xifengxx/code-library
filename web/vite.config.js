import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { readFileSync } from 'node:fs'
import { fileURLToPath } from 'node:url'

const REPOS_PATH = fileURLToPath(new URL('./src/data/repos.json', import.meta.url))
const REPOS_ROUTE = '/data/repos.json'

// 把仓库数据额外发布成独立静态文件，供外部脚本 / 其他 Agent 直接读取。
// 前端组件仍走 `import data from './data/repos.json'`，打包行为和旧版一致；
// dev 与 build 都以文件系统为唯一数据源，不会出现「副本过期」。
function exposeReposJson() {
  return {
    name: 'expose-repos-json',
    configureServer(server) {
      server.middlewares.use(REPOS_ROUTE, (_req, res) => {
        try {
          const body = readFileSync(REPOS_PATH, 'utf-8')
          JSON.parse(body) // 坏数据直接报错，别静默返回半成品
          res.setHeader('Content-Type', 'application/json; charset=utf-8')
          res.setHeader('Cache-Control', 'no-cache')
          res.end(body)
        } catch (err) {
          res.statusCode = 500
          res.setHeader('Content-Type', 'application/json; charset=utf-8')
          res.end(JSON.stringify({ error: err.message }))
        }
      })
    },
    generateBundle() {
      const source = readFileSync(REPOS_PATH)
      JSON.parse(source.toString('utf-8'))
      this.emitFile({
        type: 'asset',
        fileName: 'data/repos.json',
        source,
      })
    },
  }
}

export default defineConfig(({ mode }) => ({
  plugins: [react(), exposeReposJson()],
  // 生产构建部署在 GitHub Pages 子路径 /code-library/；本地 dev 仍用根路径，
  // 保证 http://localhost:5174/browse 这类既有访问习惯不受影响。
  base: mode === 'production' ? '/code-library/' : '/',
  server: { port: 5174, host: true },
}))
