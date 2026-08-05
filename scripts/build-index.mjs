#!/usr/bin/env node
/**
 * build-index.mjs — 扫描 repos/ 下所有条目 MD，生成：
 *   1. output/README.md        总索引（统计 + 分类表）
 *   2. web/src/data/repos.json 网页端数据（含分节摘要）
 *
 * 零依赖：自写简易 frontmatter / 分节解析器。
 * 用法：node scripts/build-index.mjs
 */
import fs from 'node:fs'
import path from 'node:path'
import { fileURLToPath } from 'node:url'

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..')
const REPOS_DIR = path.join(ROOT, 'repos')
const OUT_INDEX = path.join(ROOT, 'output', 'README.md')
const OUT_JSON = path.join(ROOT, 'web', 'src', 'data', 'repos.json')

const CATEGORIES = ['ai-llm', 'frontend', 'backend', 'database', 'devops', 'tools', 'mobile', 'learning', 'templates', 'misc']
const LABELS = {
  'ai-llm': 'AI / LLM', 'frontend': '前端', 'backend': '后端', 'database': '数据库 / 存储',
  'devops': 'DevOps / 云', 'tools': '开发工具 / CLI', 'mobile': '移动端',
  'learning': '学习资源', 'templates': '项目模板 / 示例', 'misc': '其他',
}

/** 简易 YAML frontmatter 解析：支持 key: value / key: ["a","b"] / 数字 */
function parseFrontmatter(raw) {
  const meta = {}
  for (const line of raw.split('\n')) {
    const m = line.match(/^([A-Za-z_][A-Za-z0-9_]*):\s*(.*)$/)
    if (!m) continue
    let [, key, val] = m
    val = val.trim()
    if (val.startsWith('[') && val.endsWith(']')) {
      meta[key] = val.slice(1, -1).split(',').map((s) => s.trim().replace(/^["']|["']$/g, '')).filter(Boolean)
    } else if (/^-?\d+(\.\d+)?$/.test(val)) {
      meta[key] = Number(val)
    } else {
      meta[key] = val.replace(/^["']|["']$/g, '')
    }
  }
  return meta
}

/** 把 ## 标题分隔成 sections，标题前内容归到 __lead__ */
function splitSections(body) {
  const sections = {}
  let cur = '__lead__'
  sections[cur] = []
  for (const line of body.split('\n')) {
    const h = line.match(/^##\s+(.*)$/)
    if (h) { cur = h[1].trim(); sections[cur] = [] }
    else sections[cur].push(line)
  }
  const out = {}
  for (const k of Object.keys(sections)) out[k] = sections[k].join('\n').trim()
  return out
}

function readEntry(file) {
  const text = fs.readFileSync(file, 'utf8')
  const parts = text.split(/^---\s*$/m)
  const meta = parts.length >= 3 ? parseFrontmatter(parts[1]) : {}
  const body = parts.length >= 3 ? parts.slice(2).join('---').trim() : text.trim()
  const dirCat = path.basename(path.dirname(file))
  return {
    name: meta.name || path.basename(file, '.md'),
    repo_url: meta.repo_url || '',
    article_url: Array.isArray(meta.article_url) ? meta.article_url : (meta.article_url ? [meta.article_url] : []),
    category: CATEGORIES.includes(meta.category) ? meta.category : (CATEGORIES.includes(dirCat) ? dirCat : 'misc'),
    tags: Array.isArray(meta.tags) ? meta.tags : [],
    language: meta.language || '',
    stars: typeof meta.stars === 'number' && Number.isFinite(meta.stars) ? meta.stars : null,
    status: meta.status || '收藏',
    date_added: meta.date_added || '',
    sections: splitSections(body),
    body,
    file: path.relative(ROOT, file),
  }
}

function starsFmt(n) {
  if (n == null) return '—'
  return n >= 1000 ? (n / 1000).toFixed(1).replace(/\.0$/, '') + 'k' : String(n)
}

// ── 扫描 ────────────────────────────────────────────────
const entries = []
for (const catDir of fs.readdirSync(REPOS_DIR, { withFileTypes: true })) {
  if (!catDir.isDirectory() || catDir.name.startsWith('.')) continue
  const dir = path.join(REPOS_DIR, catDir.name)
  for (const f of fs.readdirSync(dir)) {
    if (!f.endsWith('.md')) continue
    entries.push(readEntry(path.join(dir, f)))
  }
}
entries.sort(
  (a, b) => CATEGORIES.indexOf(a.category) - CATEGORIES.indexOf(b.category) || a.name.localeCompare(b.name, 'zh'),
)

// ── output/README.md ───────────────────────────────────
const byCat = {}
for (const e of entries) (byCat[e.category] ??= []).push(e)

const lines = []
lines.push('# 📚 代码仓库总索引', '')
lines.push(`> 自动生成自 \`repos/\`（运行 \`node scripts/build-index.mjs\` 重新生成）。共 **${entries.length}** 个仓库。`, '')
lines.push('| 分类 | 数量 |', '|---|---|')
for (const c of CATEGORIES) lines.push(`| ${LABELS[c]} | ${(byCat[c] || []).length} |`)
lines.push('')

for (const c of CATEGORIES) {
  const list = byCat[c] || []
  if (!list.length) continue
  lines.push(`## ${LABELS[c]}（${list.length}）`, '')
  lines.push('| 仓库 | 一句话 | 语言 | Stars | 标签 | 状态 |', '|---|---|---|---|---|---|')
  for (const e of list) {
    const summary = (e.sections['一句话'] || '').replace(/\n+/g, ' ').slice(0, 60)
    const link = e.repo_url || e.file
    lines.push(`| [${e.name}](${link}) | ${summary} | ${e.language || '—'} | ${starsFmt(e.stars)} | ${e.tags.join(', ') || '—'} | ${e.status} |`)
  }
  lines.push('')
}
fs.writeFileSync(OUT_INDEX, lines.join('\n'))

// ── web/src/data/repos.json ─────────────────────────────
fs.mkdirSync(path.dirname(OUT_JSON), { recursive: true })
fs.writeFileSync(OUT_JSON, JSON.stringify({ source: 'repos/', entries }, null, 2))

console.log(`✅ 索引 ${entries.length} 条 → ${path.relative(ROOT, OUT_INDEX)}`)
console.log(`✅ Web 数据 → ${path.relative(ROOT, OUT_JSON)}`)
