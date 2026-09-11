---
name: "diagram-design"
repo_url: "https://github.com/cathrynlavery/diagram-design"
article_url: ["https://mp.weixin.qq.com/s/JJKkzrrf9Rmr62YMkchykQ"]
category: "ai-llm"
tags: ["Agent-skill", "claude-code", "codex", "图表", "数据可视化", "SVG", "品牌风格"]
language: "HTML"
stars: 28047
status: "收藏"
date_added: "2026-08-28"
---

## 一句话
Diagram Design 是一个适配 Claude Code、Codex、Factory Droid、Pi 等 AI 编程工具的图表制作 **Agent Skill**，内置 38 种图表类型，专画「编辑级质感」的自包含 HTML+SVG 图——不是一眼假的 AI 生成图，也拒绝 Mermaid 的随手感。

## 内容与亮点
- **核心能力**：38 种图表类型（架构图、流程图、时序图、状态机、ER 图、泳道图、雷达图、桑基图、Wardley 地图、用户旅程图、部署图、UML 类图、数据库表结构图等），每种提供 **简约浅色 / 简约深色 / 完整版编辑样式** 3 套静态变体
- **自包含输出**：生成单个 HTML 文件（内嵌 **SVG**），双击浏览器即开，**无构建步骤、不依赖 JS 和外部图片资源**
- **品牌风格匹配**：一句话让图自动抓取网站首页提取主色调与字体、映射成语义化角色并统一套用，内置 **WCAG 对比度检查**
- **导入重绘**：读取已有 **Draw.io / Mermaid** 源文件，用同一套设计系统重画（内容不变、风格换新），4 个维度可调：输出格式（HTML/SVG/PNG）、尺寸、细节程度、目标受众
- **多 Agent 支持**：Claude Code / Codex / Factory Droid / Pi 均可安装
- **适用**：技术文档、产品方案里需要架构图 / 流程图 / 时序图等配图的场景

## 如何使用
按各 Agent 安装：
```bash
# Claude Code
/plugin marketplace add cathrynlavery/diagram-design
/plugin install diagram-design@diagram-design

# Codex
codex plugin marketplace add cathrynlavery/diagram-design
codex plugin add diagram-design@diagram-design

# Pi
pi install https://github.com/cathrynlavery/diagram-design
```
使用：自然语言直接描述，如 `/diagram-design 帮我画一个架构图：前端、后端、数据库、Redis 缓存`；让图匹配品牌风格只需说 `帮 diagram-design 接入 https://yoursite.com 的品牌风格`。
依赖：Claude Code（或 Codex / Pi 任一），生成结果本身零额外依赖。

## 对我的价值
用 Claude Code 做投研与项目文档时，架构图 / 流程图 / 时序图是高频配图需求。相比 Mermaid 的无设计感，它能产出与品牌调性一致的编辑级图表，还能把已有 Draw.io / Mermaid 图一键重绘。值得实践：先装 skill，拿一个投研框架图或系统架构图试画，验证风格统一度与对比度检查的实际体验。

## 实践心得（待实践）
>
