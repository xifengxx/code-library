# Code Library — 项目指令（入库 SOP）

本仓库是「代码仓库参照库」。用户会把平时看到的**代码仓库 / 文章 / 链接**发给你，你的职责是**自动分门归类入库**。收到此类内容时，严格按下面的流程处理。

## 当用户发来仓库 / 文章链接

1. **识别对象**：GitHub 仓库 / 文章 / 官方文档 / 其他。
2. **抓取元数据**（GitHub 仓库）：
   - `WebFetch https://api.github.com/repos/{owner}/{repo}`（**公开仓库无需 token**）
   - 提取：官方描述 `description`、语言 `language`、`stargazers_count`、`topics`
   - 若 API 抓取失败，退回 `WebFetch` 仓库主页。
3. **写简介**（中文，2~5 句，全部来自抓取信息 + 你的判断）：
   - **一句话**：这个仓库是干什么的
   - **作用与亮点**：解决什么问题、核心卖点
   - **主要内容**：主要模块 / 技术栈 / 关键特性
   - **对我的价值**：能参照什么、适合什么场景、值不值得手动实践
4. **分类 + 标签**：
   - 一级分类（枚举，只能选一个）→ 决定存放子目录
   - `tags` 自由，可多个，覆盖技术栈 + 用途
5. **写入条目**：`repos/<category>/<name>.md`（模板见下，文件名用仓库名）。
6. **更新索引**：运行 `node scripts/build-index.mjs`（重新生成 `output/README.md` + 网页数据）。
7. **回复用户**：已入库 + 分类 + 一句话简介；提示"分类/标签可改，改后重跑 build-index"。

## 分类枚举（10 个）

| 分类 | 目录 | 涵盖 |
|---|---|---|
| `ai-llm` | `repos/ai-llm/` | AI/LLM：模型、Agent 框架、RAG、Prompt、推理、向量应用 |
| `frontend` | `repos/frontend/` | React/Vue、组件库、动画、可视化、UI、状态管理 |
| `backend` | `repos/backend/` | 后端框架、API、中间件、消息队列、微服务 |
| `database` | `repos/database/` | 关系/NoSQL/缓存/搜索/对象存储 |
| `devops` | `repos/devops/` | CI/CD、容器、K8s、监控、Serverless |
| `tools` | `repos/tools/` | CLI、脚手架、调试、编辑器生态、效率工具 |
| `mobile` | `repos/mobile/` | iOS/Android/跨端 |
| `learning` | `repos/learning/` | 教程、论文、电子书、面试、资源大全 |
| `templates` | `repos/templates/` | 可跑可抄的全栈示例、开源实践模板 |
| `misc` | `repos/misc/` | 其他 |

## 条目模板

```markdown
---
name: "仓库名"
repo_url: "https://github.com/owner/repo"
article_url: ["https://...文章", "https://...官方文档"]   # 可为空 []
category: "ai-llm"
tags: ["tag1", "tag2"]
language: "Python"
stars: 12345
status: "收藏"        # 收藏 / 研究 / 实践 / 应用
date_added: "2026-08-05"
---

## 一句话
这个仓库是干什么的。

## 作用与亮点
解决什么问题、核心卖点。

## 主要内容
主要模块 / 技术栈。

## 对我的价值
能参照什么、适合什么场景。

## 实践心得（待实践）
> 用户手动实践后，把踩坑、结论、是否推荐写在这里。未实践前保留「待实践」。
```

## 规则

- 内容一律**中文**（仓库名、URL、语言、Stars 除外）。
- 分类不准 → 用户改文件顶部 `category:` 字段后重跑 `node scripts/build-index.mjs`。
- **绝不把任何密钥 / token 写入条目或脚本**（GitHub 公开 API 无需 token；本仓库 `.gitignore` 已排除 `.env`）。
- 已有同名条目 → 先 `Read` 原文件，在**原文追加**/更新简介，不覆盖重写。
- 用户说"批量导入/整理"→ 一次处理多个，逐个入库并汇总表格给用户确认。
