# 📚 Code Library — 代码仓库参照库

个人代码仓库收藏 / 索引 / 实践系统。

把你平时看到的**代码仓库、相关文章、链接**发给 Claude，Claude 自动抓取元数据、写简介、分门归类、入库；之后随时可查、可参照、可手动实践并记录踩坑。开发新项目前先来这里翻一翻，找现成的参照。

## 三种呈现形式

| 形式 | 说明 | 位置 |
|---|---|---|
| **MD 文档** | 数据源本身（每仓库一个文件）+ 自动生成的总索引 | `repos/` · `output/README.md` |
| **Word 文档** | pandoc 快速版 + python-docx 精装版（带封面/目录/表格） | `output/word/` |
| **网页端** | Vite + React 卡片墙：分类浏览 / 搜索 / 详情 / 统计 | `web/` |

## 快速使用

```bash
# 入库：把仓库/文章链接发给 Claude（项目 .claude/CLAUDE.md 定义了入库 SOP）

# 浏览网页端
cd web && npm run dev        # 浏览器打开 http://localhost:5174

# 一键重建三版本（每次入库后运行：MD 索引 + 网页数据 + Word 快速版/精装版）
bash scripts/rebuild-all.sh
```

## 数据接口（JSON）

网页端除了给人看，也把全部条目发布成一份独立 JSON，方便脚本、其他 Agent 或外部工具直接消费：

```
https://xifengxx.github.io/code-library/data/repos.json     # 线上
http://localhost:5174/data/repos.json                       # 本地 dev
```

结构为 `{ source, entries: [...] }`，`entries` 每条对应 `repos/<category>/<name>.md` 一个条目：

| 字段 | 说明 |
|---|---|
| `name` / `repo_url` / `article_url` / `category` / `tags` / `language` / `stars` / `status` / `date_added` | frontmatter 原样字段 |
| `file` | 源文件相对路径，如 `repos/ai-llm/adhd.md` |
| `body` | 正文 Markdown 原文，可直接渲染 |
| `sections` | 已解析的分节对象（`一句话` / `内容与亮点` / `如何使用` / `对我的价值` / `实践心得（待实践）`） |

```bash
# 例：按分类统计
curl -s https://xifengxx.github.io/code-library/data/repos.json \
  | node -e 'let d="";process.stdin.on("data",c=>d+=c).on("end",()=>{
      const t={};for(const e of JSON.parse(d).entries)t[e.category]=(t[e.category]||0)+1;
      console.log(t)})'
```

该文件由 `web/vite.config.js` 的 `expose-repos-json` 插件在构建时从 `web/src/data/repos.json` **原样输出**，
dev 下按请求实时读取，不存在需要手动同步的副本；源头仍是 `repos/` 的 Markdown。
**限制**：GitHub Pages 无法自定义响应头，所以从**其它域名的浏览器页面**里 `fetch` 会被 CORS 拦；
`curl` / Node / Python / 服务端脚本读不受影响。

## 分类（一级固定枚举，标签自由）

`ai-llm` AI/LLM · `frontend` 前端 · `backend` 后端 · `database` 数据库/存储 · `devops` DevOps/云 · `tools` 开发工具/CLI · `mobile` 移动端 · `learning` 学习资源 · `templates` 项目模板/示例 · `misc` 其他

## 目录结构

```
code-library/
├── .claude/CLAUDE.md        # 项目指令：入库 SOP（Claude 收到链接就按它处理）
├── docs/REQUIREMENTS.md     # 需求分析文档
├── repos/                   # 数据源：每仓库一个 MD（YAML frontmatter + 正文）
├── assets/                  # 截图等媒体
├── output/
│   ├── README.md            # 自动生成的总索引
│   └── word/                # 生成的 .docx
├── scripts/
│   ├── build-index.mjs      # 扫 repos/ → 索引 + Web 数据
│   ├── build-word.sh        # pandoc 快速版
│   └── build-word-fancy.py  # python-docx 精装版
├── web/                     # Vite + React 静态站
└── README.md
```

## 说明

- **数据源唯一**：`repos/` 下的 MD 是唯一事实来源；网页端和 Word 都是它的生成产物。
- **无需任何密钥**：GitHub 公开 API 免 token；项目内不存密钥。
- 详情与决策见 [docs/REQUIREMENTS.md](docs/REQUIREMENTS.md)。
