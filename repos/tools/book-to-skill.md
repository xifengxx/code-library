---
name: "book-to-skill"
repo_url: "https://github.com/virgiliojr94/book-to-skill"
article_url: ["https://github.com/virgiliojr94/book-to-skill/blob/main/docs/USAGE.md"]
category: "tools"
tags: ["agent-skill", "claude-code", "pdf", "skill-creator", "知识管理"]
language: "Python"
stars: 16692
status: "收藏"
date_added: "2026-08-05"
---

## 一句话
把任意技术书 PDF、文档文件夹或资料合集，**提炼成一个结构化 Claude Code Skill**——框架、决策规则、反模式、逐章文件，随用随取，不幻觉。

## 内容与亮点
- **核心价值**：比把整本书塞进上下文省 **24×–51× token**（实测数据）；问问题时智能体读对应章节，从真实内容作答，不幻觉
- **三步流程**：指向文件/文件夹/glob → 提炼成 Skill（结构而非摘要）→ 智能体按需加载（`/你的书-slug` 直接问答）
- **生成产物**：`SKILL.md`（核心心智模型 + 章节索引，~4000 tokens）、`chapters/ch0X-*.md`（每章一份，**按需加载**不计入预算，~1000 tokens 各）、`glossary.md`（术语表）、`patterns.md`（算法/设计模式）、`cheatsheet.md`（决策表）
- **不止书**：任何结构化文本都行——内部文档/runbook、品牌设计规范等，可把整个 docs/ 折叠进一个 Skill
- **隐私**：全程本地处理，文件不上传；生成品是合成衍生物，不复制原文段落；MIT 协议
- **兼容**：开放 Agent Skills 标准，Claude Code / Copilot CLI / Amp 通用

## 如何使用
```bash
# 安装：clone 进 Claude Code skills 目录
git clone https://github.com/virgiliojr94/book-to-skill.git ~/.claude/skills/book-to-skill
# (Copilot CLI: ~/.copilot/skills/ · Amp/跨 agent: ~/.agents/skills/)

# 使用：指向文件/文件夹/glob，可选自定义 skill 名
/book-to-skill ./my-book.pdf [skill-name]
```
- 另有 analyze-only（只分析）、generate-from-analysis（复用分析结果）、update/fold-in（增量更新）等模式，见 docs/USAGE.md

## 对我的价值
买的书读过就忘的痛点正中；可把手头的技术书/资料直接变成随用随取的 Skill，配合本项目参照库做"书 → 知识资产"闭环；对用户做投研/技术学习都很实用。

## 实践心得（待实践）
>
