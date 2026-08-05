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
  'ai-llm': '🤖',
  'frontend': '🎨',
  'backend': '⚙️',
  'database': '🗄️',
  'devops': '🚀',
  'tools': '🛠️',
  'mobile': '📱',
  'learning': '📖',
  'templates': '🧩',
  'misc': '📦',
}

export const CATEGORIES = Object.keys(LABELS)

export function fmtStars(n) {
  if (n == null) return ''
  return n >= 1000 ? (n / 1000).toFixed(1).replace(/\.0$/, '') + 'k' : String(n)
}
