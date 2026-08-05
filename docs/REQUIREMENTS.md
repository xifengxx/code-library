# 需求分析 — 代码仓库参照库

> 日期：2026-08-05 ｜ 状态：已确认，进入实施

## 1. 一句话定义

一个**「代码仓库收藏夹 + AI 智能索引 + 三形态输出」的个人知识库**：把平时看到的仓库、文章、链接发给 Claude，Claude 自动分类、写简介、入库；随时能查、能参照、能记录实践；最终以 **MD 纯文本 / Word 富文档 / 网页可视化** 三种形式呈现。

## 2. 需求理解（核心价值拆解）

| 痛点 | 系统怎么解决 |
|---|---|
| 收藏了但记不清是干嘛的 | 每条都有 Claude 写的**几句话简介**（做什么/解决什么问题/核心内容） |
| 看过的找不到、散落各处 | **统一入库 + 分类 + 标签 + 全文搜索** |
| 想参照但不知道哪个适合 | 从「实用视角」写简介：*能解决什么问题、怎么用、适合什么场景* |
| 想手动实践但没有记录 | 每条带 `status`（收藏/研究/实践/应用）+ 可追加**实践心得**章节 |
| 只看链接没形成知识 | 文章链接、官方文档一并收录，和仓库关联 |

## 3. 核心功能需求

- **F1 条目入库**：用户发链接 → Claude 完成抓元数据 → 写简介 → 分类 → 打标签 → 生成条目文件。
- **F2 元数据自动抓取**：`WebFetch` 调 GitHub API（`api.github.com/repos/{owner}/{repo}`，公开仓库免 token）拿描述/语言/stars/topics。
- **F3 分类与标签**：固定一级分类（10 类）+ 自由标签（可多打）；AI 提议、用户可改。
- **F4 三种输出**：MD（数据源 + 自动总索引）/ Word（pandoc 快速版 + python-docx 精装版）/ Web（静态站）。
- **F5 实践记录**：每条目有「实践心得」章节，试完写回去，收藏夹升级为踩坑日志。
- **F6 检索**：Web 端分类/标签/关键词搜索；MD 用 grep。

## 4. 数据模型

每条一个 Markdown 文件，**YAML frontmatter + 正文**：

```markdown
---
name / repo_url / article_url[] / category / tags[] / language / stars / status / date_added
---
## 一句话 / ## 作用与亮点 / ## 主要内容 / ## 对我的价值 / ## 实践心得（待实践）
```

选型理由：① Claude Code 直接读写，无需后端数据库；② git 版本管理可回滚；③ Web 构建时解析 frontmatter，天然一体化；④ **repos/ 是唯一事实来源**，Web/Word 都是生成产物。

## 5. 分类体系

一级分类固定枚举（对应 `repos/` 子目录）：`ai-llm` `frontend` `backend` `database` `devops` `tools` `mobile` `learning` `templates` `misc`。标签自由多打。

## 6. 工作流（Claude Code 入库 SOP）

固化为项目内 `.claude/CLAUDE.md`，任何会话收到链接都按 SOP 处理：
识别对象 → 抓 GitHub API 元数据 → 写中文简介 → 分类打标签 → 写 `repos/<cat>/<name>.md` → 重跑 `build-index.mjs` → 回复用户。

## 7. 技术选型

| 层 | 方案 | 理由 |
|---|---|---|
| 存储 | 纯 Markdown + frontmatter，git 管理 | Claude 可读写、可回滚、Web 可解析 |
| 索引/构建 | Node 脚本 `build-index.mjs`（零依赖自写解析） | 扫 MD → 索引 + Web JSON |
| Word 生成 | **pandoc**（快速版）+ **python-docx**（精装版，封面/目录/表格） | 用户确认"两者都要" |
| Web 端 | **Vite + React**（react-router + react-markdown） | 用户确认；卡片墙/搜索/详情体验最好 |
| Web 数据 | 构建时从 repos/ 解析成 JSON | 静态站无需后端 |
| 部署 | 本地 dev / GitHub Pages / Vercel | 按需 |

## 8. 目录结构

```
code-library/
├── .claude/CLAUDE.md        # 入库 SOP
├── docs/REQUIREMENTS.md     # 本文档
├── repos/                   # 数据源（每仓库一个 MD）
├── assets/                  # 截图等媒体
├── output/README.md         # 自动总索引
├── output/word/             # 生成的 docx
├── scripts/                 # build-index / build-word
└── web/                     # Vite + React 静态站
```

## 9. 实施阶段

| 阶段 | 内容 | 状态 |
|---|---|---|
| P0 搭骨架 | 目录 + git + 项目 CLAUDE.md + 需求文档 | ✅ |
| P1 跑通流程 | 3 个示例条目 + build-index + Web 雏形 | ✅ |
| P2 Web 完善 | 分类/搜索/详情/统计 | ✅ |
| P3 Word 导出 | pandoc 快速版 + python-docx 精装版 | ✅ |
| P4 打磨 | 批量导入、stars 自动刷新、实践记录模板 | ⏳ 长期 |

## 10. 注意事项

- **无密钥**：GitHub 公开 API 免 token，项目内不存任何密钥。
- **内容以中文为主**，便于检索。
- **数据源唯一**：避免"改了两处不一致"。
- **分类不准可改**：改 frontmatter 后重跑 build-index 即全链路更新。
