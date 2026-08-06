---
name: "AI-For-Beginners"
repo_url: "https://github.com/microsoft/AI-For-Beginners"
article_url: ["https://microsoft.github.io/AI-For-Beginners/"]
category: "learning"
tags: ["ai", "machine-learning", "deep-learning", "课程", "微软", "beginner"]
language: "Jupyter Notebook"
stars: 62517
status: "收藏"
date_added: "2026-08-06"
---

## 一句话
微软官方出品的 **「AI 入门」免费课程**仓库：12 周、24 课，覆盖神经网络、计算机视觉、NLP、生成式 AI，每课配实操代码、测验和实验，零基础可学。

## 内容与亮点
- **课程结构**：12 周 24 课，每课含理论 + 动手代码 + 测验 + 实验（lab），用 **TensorFlow / PyTorch** 双框架演示
- **覆盖面**：符号 AI（GOFAI 知识表示与推理）、神经网络与深度学习、图像/文本神经架构（**CNN / RNN / Transformer**）、生成式 AI（**GAN**）、遗传算法、多智能体系统，以及 **AI 伦理**
- **多语言**：50+ 语言翻译（含**简体中文**），GitHub Action 自动同步维护
- **配套**：新手友好的 sketchnote 视觉笔记 + 课程思维导图；微软 for-beginners 系列课程之一（同系列还有 ML / Data Science / Generative AI）

## 如何使用
```bash
# 仓库含 50+ 翻译文件体积大，用稀疏检出快速克隆（跳过翻译，保留全部课程）
git clone --filter=blob:none --sparse https://github.com/microsoft/AI-For-Beginners.git
cd AI-For-Beginners
git sparse-checkout set --no-cone '/*' '!translations' '!translated_images'
```
- 按周/课顺序学习；需要完整中文版可单独拉取 `translations/zh-cn` 目录
- 在线版文档：https://microsoft.github.io/AI-For-Beginners/

## 对我的价值
系统补 AI 基础知识的免费路线图；学完能对 LLM / RAG / CNN 建立整体认知，反过来理解正在用的 DeepSeek、Agent 框架的原理；每课小实验可直接在 Jupyter 里跑起来实践。

## 实践心得（待实践）
>
