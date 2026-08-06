import {
  Robot, Palette, GearSix, Database, RocketLaunch, Wrench,
  DeviceMobile, GraduationCap, SquaresFour, Package,
} from '@phosphor-icons/react'

export const LABELS = {
  'ai-llm': 'AI / LLM',
  'frontend': '前端',
  'backend': '后端',
  'database': '数据库 / 存储',
  'devops': 'DevOps / 云',
  'tools': '开发工具 / CLI',
  'mobile': '移动端',
  'learning': '学习资源',
  'templates': '项目模板 / 示例',
  'misc': '其他',
}

export const ICONS = {
  'ai-llm': Robot,
  'frontend': Palette,
  'backend': GearSix,
  'database': Database,
  'devops': RocketLaunch,
  'tools': Wrench,
  'mobile': DeviceMobile,
  'learning': GraduationCap,
  'templates': SquaresFour,
  'misc': Package,
}

export const CATEGORIES = Object.keys(LABELS)

export function fmtStars(n) {
  if (n == null) return ''
  return n >= 1000 ? (n / 1000).toFixed(1).replace(/\.0$/, '') + 'k' : String(n)
}

/** 由 GitHub 仓库 URL 推导社交预览图地址（opengraph.githubassets.com，hash 固定为 1 即可命中） */
export function repoOgUrl(repoUrl) {
  if (!repoUrl) return null
  const m = String(repoUrl).match(/github\.com\/([^/]+\/[^/]+)\/?$/)
  return m ? `https://opengraph.githubassets.com/1/${m[1]}` : null
}
