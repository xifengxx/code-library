---
name: "scroll-world"
repo_url: "https://github.com/oso95/scroll-world"
article_url: ["https://mp.weixin.qq.com/s/kE3Ev7uXP-_Lsw6GpvhJFQ"]
category: "frontend"
tags: ["web-animation", "landing-page", "agent-skill", "cinematic", "3d"]
language: "JavaScript"
stars: 7500
status: "收藏"
date_added: "2026-08-05"
---

## 一句话
一个 Agent Skill，把任意品牌资料变成**「滚动飞越式」3D 电影感落地页**——滚轮像镜头一样穿越场景，章节文案随场景出现。

## 内容与亮点
- **核心能力**：喂入品牌资料/产品信息/视觉风格 → 自动规划场景、生成图片和镜头视频，接进网页**滚动播放引擎**
- **交互效果**：滚动即镜头飞行、回滚即倒退，体验像一支可用鼠标控制进度的品牌短片
- **适用**：产品发布页、品牌官网、旅行项目、地产展示、个人作品集
- **素材说明**：图片/视频需按每个项目单独生成，仓库不附带素材

## 如何使用
```bash
# Claude Code 插件市场安装
/plugin marketplace add oso95/scroll-world
/plugin install scroll-world@scroll-world
# Codex 等 Agent Skills 工具
npx skills add oso95/scroll-world
```
- 依赖：`Monid CLI`（视频，调 Seedance 2.0）、`Higgsfield CLI`（场景图）、`ffmpeg`/`ffprobe`（帧提取编码）、竖屏画布需 Python3 + Pillow
- 调用：输入 `/scroll-world` 或描述想要的滚动品牌世界

## 对我的价值
做品牌/作品集类官网时可直接装 Skill 让 AI 出整站；研究「AI 驱动前端动画生产流水线」的上游参照。

## 实践心得（待实践）
>
