#!/usr/bin/env node
/**
 * check-data.mjs — 轻量数据健康检查：扫描 repos/ 下所有条目，
 * 检查 frontmatter 完整性、分类合法性、文件名一致性、标签、正文分节、URL 可达性。
 * 用法：node scripts/check-data.mjs [--online]   （--online 才做网络可达性检查）
 */
import fs from 'node:fs'
import path from 'node:path'
import { execSync } from 'node:child_process'
import { fileURLToPath } from 'node:url'

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..')
const REPOS_DIR = path.join(ROOT, 'repos')
const CATEGORIES = ['ai-llm', 'frontend', 'backend', 'database', 'devops', 'tools', 'mobile', 'learning', 'templates', 'misc']
const REQUIRED = ['name', 'repo_url', 'category', 'tags', 'language', 'stars', 'status', 'date_added']
const SECTIONS = ['一句话', '内容与亮点', '如何使用', '对我的价值', '实践心得']
const ONLINE = process.argv.includes('--online')

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

function readEntry(file) {
  const text = fs.readFileSync(file, 'utf8')
  const parts = text.split(/^---\s*$/m)
  const meta = parts.length >= 3 ? parseFrontmatter(parts[1]) : {}
  const body = parts.length >= 3 ? parts.slice(2).join('---') : ''
  return { file, meta, body, dir: path.basename(path.dirname(file)) }
}

// ── 扫描 ────────────────────────────────
const entries = []
for (const d of fs.readdirSync(REPOS_DIR, { withFileTypes: true })) {
  if (!d.isDirectory() || d.name.startsWith('.')) continue
  for (const f of fs.readdirSync(path.join(REPOS_DIR, d.name))) {
    if (f.endsWith('.md')) entries.push(readEntry(path.join(REPOS_DIR, d.name, f)))
  }
}

const problems = []
const push = (file, msg) => problems.push(`  ✗ ${path.relative(ROOT, file)}: ${msg}`)

for (const e of entries) {
  const m = e.meta
  // 1. 必填字段
  for (const k of REQUIRED) {
    const v = m[k]
    if (v === undefined || v === '' || (Array.isArray(v) && v.length === 0)) push(e.file, `缺必填字段 ${k}`)
  }
  // 2. 分类合法性 + 与目录一致
  if (m.category && !CATEGORIES.includes(m.category)) push(e.file, `非法分类 "${m.category}"`)
  if (m.category && m.category !== e.dir) push(e.file, `分类 "${m.category}" 与目录 "${e.dir}" 不一致`)
  // 3. 文件名与 name 一致
  if (m.name && path.basename(e.file, '.md') !== m.name) push(e.file, `文件名与 name 不一致（${m.name}）`)
  // 4. 标签：非空 + 无重复 + 无空格
  if (Array.isArray(m.tags)) {
    if (new Set(m.tags).size !== m.tags.length) push(e.file, 'tags 有重复')
    if (m.tags.some((t) => /\s/.test(t))) push(e.file, `tags 含空格: ${m.tags.filter((t) => /\s/.test(t)).join(', ')}`)
  }
  // 5. stars 类型
  if (m.stars !== undefined && typeof m.stars !== 'number') push(e.file, `stars 非数字: ${m.stars}`)
  // 6. status 合法
  if (m.status && !['收藏', '研究', '实践', '应用'].includes(m.status)) push(e.file, `非法 status "${m.status}"`)
  // 7. repo_url 格式
  if (m.repo_url && !/^https:\/\/github\.com\/[^/]+\/[^/]+\/?$/.test(m.repo_url)) push(e.file, `repo_url 非 GitHub 仓库格式: ${m.repo_url}`)
  // 8. 正文分节
  for (const s of SECTIONS) {
    if (!e.body.includes(`## ${s}`)) push(e.file, `正文缺分节「${s}」`)
  }
}

// 9. 全局：重名
const names = {}
for (const e of entries) (names[e.meta.name || ''] = names[e.meta.name || ''] || []).push(e.file)
for (const [n, files] of Object.entries(names)) {
  if (files.length > 1) problems.push(`  ✗ 仓库名重复 "${n}": ${files.map((f) => path.basename(f)).join(', ')}`)
}

// ── 汇总 ────────────────────────────────
console.log(`📊 共 ${entries.length} 个条目`)
if (problems.length) {
  console.log(`\n⚠️  发现 ${problems.length} 个问题:`)
  console.log(problems.join('\n'))
} else {
  console.log('✅ 本地数据检查全部通过（字段/分类/文件名/标签/分节）')
}

// 10. 网络可达性（可选）：走 api.github.com 验证仓库存在性
//     （本机 shell 到 github.com 网页有时被网络阻断超时，但 api.github.com 稳定可达）
if (ONLINE) {
  console.log('\n🌐 仓库存在性检查（api.github.com）:')
  for (const e of entries) {
    const m = e.meta.repo_url?.match(/github\.com\/([^/]+\/[^/]+)\/?$/)
    if (!m) { console.log(`  ⏭  ${e.meta.name}: 无法从 repo_url 解析 owner/repo`); continue }
    try {
      const code = execSync(`curl -s -o /dev/null -w "%{http_code}" --max-time 12 "https://api.github.com/repos/${m[1]}"`, { encoding: 'utf8' }).trim()
      console.log(`  ${code === '200' ? '✅' : '⚠️'}  ${code}  ${m[1]}`)
    } catch {
      console.log(`  ⚠️  请求失败 ${m[1]}`)
    }
  }
}
