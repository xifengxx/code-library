---
name: "impeccable"
repo_url: "https://github.com/pbakaus/impeccable"
article_url: ["https://impeccable.style"]
category: "frontend"
tags: ["agent-skill", "design-system", "ui", "claude-code", "a11y"]
language: "JavaScript"
stars: 55502
status: "收藏"
date_added: "2026-08-05"
---

## 一句话
给 AI 编程智能体的**设计规范系统**：1 个 Skill、23 条命令、59 条确定性检测规则，消除 AI 生成前端的"通用 SaaS 模板味"。

## 内容与亮点
- **设计上下文**：`/impeccable init` 询问品牌型/产品型界面，生成 `PRODUCT.md` + `DESIGN.md`，后续命令据此知道受众、品牌定位、语气、配色、字体与组件
- **23 条命令**：`craft`（成形后构建+视觉迭代）、`shape`（写码前规划 UX/UI）、`critique`（UX 设计评审）、`audit`（a11y/性能/响应式技术检查）、`polish`（收尾）、`extract`（抽组件与 token 成设计系统）、`document`（从现有代码生成 DESIGN.md）等
- **确定性检测**：59 条检测规则**无需 LLM / 无 API key**（CLI + 浏览器扩展直接跑），再加 LLM 批评检查
- **针对的"AI 味"**：Inter 字体、紫蓝渐变、卡片套卡片、灰字彩底、标题上方圆角方块图标
- **渊源**：从 Anthropic 官方 `frontend-design` skill 演进而来

## 如何使用
```bash
# 项目根目录安装
npx impeccable install
```
- 装好后在 AI 编程工具内运行 `/impeccable init` 初始化，之后用 `/impeccable <command> <target>` 调用
- 每个新项目从 init 开始；完整文档：https://impeccable.style

## 对我的价值
做前端时给 AI 一套统一设计规范，避免每个项目都长一个样；`audit` 命令做无障碍/性能/响应式检查很实用；比 Anthropic 官方 skill 多了确定性的无 LLM 检测。

## 实践心得（待实践）
>
