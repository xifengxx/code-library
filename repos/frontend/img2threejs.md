---
name: "img2threejs"
repo_url: "https://github.com/img2threejs/img2threejs"
article_url: ["https://mp.weixin.qq.com/s/kE3Ev7uXP-_Lsw6GpvhJFQ"]
category: "frontend"
tags: ["threejs", "webgl", "image-to-3d", "procedural-generation", "claude-code", "ai-agents"]
language: "Python"
stars: 9757
status: "收藏"
date_added: "2026-08-05"
---

## 一句话
给一张参考图（耳机/机械/建筑/道具），自动重建为可动画、可改代码的纯代码 Three.js 模型。

## 作用与亮点
- 明确选择**纯代码重建**路线：用基础几何体 + 程序化着色器 + 生成式几何搭出物体，而非神经渲染
- 先评估图片是否适合重建，再判断物体类型、复杂度与质量目标
- 生成前先整理 `detailInventory`，把倒角/螺丝/刻线/光泽/污渍等决定辨识度的细节安排到真实组件或材质
- **质量门控**：分阶段制作（结构→形体→材质→表面细节→灯光→交互→优化），每轮渲染截图与原图对照做视觉检查，不过关就回改，通过才解锁下一轮
- 代码模型可继续调色、移动零件、加动画，适合产品展示、浏览器小游戏、交互式官网

## 主要内容
- Agent Skill：Claude Code / Codex / OpenCode 通用（`npx skills add img2threejs/img2threejs`，Claude Code 可直接 clone 进 `~/.claude/skills/`）
- 官方 topics：threejs / webgl / procedural-generation / image-to-3d / ai-agents / computer-graphics / typescript
- Token 高效：流程化拆解，避免智能体"看一眼就乱写"

## 对我的价值
需要 3D 展示资产（产品/游戏/官网）时直接用；学习"AI 智能体 + 程序化建模"的工程化流水线（拆解→清单→分阶段→视觉自检）。

## 实践心得（待实践）
>
