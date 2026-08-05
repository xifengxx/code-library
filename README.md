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
