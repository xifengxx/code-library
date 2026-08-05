---
name: "hallmark"
repo_url: "https://github.com/Nutlope/hallmark"
article_url: ["https://usehallmark.com"]
category: "frontend"
tags: ["agent-skill", "design", "anti-slop", "css", "claude-code"]
language: "CSS"
stars: 21872
status: "收藏"
date_added: "2026-08-05"
---

## 一句话
一个给 Claude Code / Cursor / Codex 的设计 Skill，专门**拒绝看起来像 AI 生成的网页**——通过结构选择 + 主题套用 + 门禁检测，让 AI 出稿不像同一个模板换配色。

## 内容与亮点
- **核心机制**：为每个设计简报挑选 **macrostructure**（宏观结构），套用 **20 套主题**之一，再跑 **57 道 slop-test 门禁** + 输出前自我批评，拒绝 LLM 训练出来的"通用默认样式"
- **四个动词**：
  - 默认：新建 UI（选结构 → 套规则 → 门禁检测后交付）
  - `hallmark audit <target>`：按反模式给现有代码**打分**，只出整改清单不改码
  - `hallmark redesign <target>`：保留文案/信息架构/品牌，换一种视觉指纹重做
  - `hallmark study <截图|URL>`：从你欣赏的设计里提取 DNA（结构、字体搭配、色彩锚点），可产出可移植的 `design.md`
- **Custom 模式**：简报带创意意图且无主题可套时，从零定制配色/字体/布局，同样过 57 道门禁
- **制作**：Together AI；每页是自包含 HTML + CSS，宏结构写在 CSS 注释里

## 如何使用
```bash
# 标准 Agent Skill 安装（Vercel skills CLI）
npx skills add Nutlope/hallmark
```
- 装好后用 `/hallmark` 相关命令调用（build / audit / redesign / study）
- 主题与示例可在线浏览：https://usehallmark.com

## 对我的价值
做前端网页时让 AI 出"不像 AI 生成"的设计，避免千篇一律的模板味；`audit` 可给现有项目打 AI 味反模式分；`study` 能从喜欢的网站提取设计规范供自己项目复用。

## 实践心得（待实践）
>
