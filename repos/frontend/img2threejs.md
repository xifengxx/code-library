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
给一张参考图（耳机 / 机械 / 建筑 / 道具），自动重建为**可动画、可改代码的纯代码 Three.js 模型**——图像转 3D，全程程序化而非神经渲染。

## 内容与亮点
- **重建路线**：基础几何体 + 程序化着色器 + 生成式几何搭出物体，代码模型可继续调色、移动零件、加动画
- **质量门控**：先评估可重建性 → 整理 `detailInventory`（倒角/螺丝/刻线等辨识度细节）→ 分 7 阶段制作 → 每轮渲染截图对照原图**视觉自检**，不过关回改
- **Token 高效**：流程化拆解，避免智能体「看一眼就乱写」
- **适用**：产品展示、浏览器小游戏、交互式官网的 3D 资产

## 如何使用
```bash
# Claude Code：clone 进 skills 目录
git clone https://github.com/img2threejs/img2threejs.git ~/.claude/skills/img2threejs
# Codex
npx skills add img2threejs/img2threejs -a codex
```
- 调用：附参考图 + `/img2threejs 把这个物体重构成 Three.js 模型，保持原有比例、角度和颜色`

## 对我的价值
需要 3D 展示资产（产品/游戏/官网）时直接用；学习「AI 智能体 + 程序化建模」的工程化流水线（拆解 → 清单 → 分阶段 → 视觉自检）。

## 实践心得（待实践）
>
