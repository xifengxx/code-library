---
name: "adhd"
repo_url: "https://github.com/UditAkhourii/adhd"
article_url: ["https://divergent.sh"]
category: "ai-llm"
tags: ["Agent", "思维发散", "Tree-of-Thought", "Claude", "创意", "TypeScript", "Codex"]
language: "TypeScript"
stars: 4503
status: "收藏"
date_added: "2026-08-17"
---

## 一句话
给 coding agent 用的「发散思维」Skill——用 **Tree-of-Thought + 隔离发散 + 剪枝** 架构,硬性解决 AI 过早收敛、想法不够发散的问题,已演进为 Skill + CLI + npm 库 + 论文的完整项目。

## 内容与亮点
- **核心洞察**：Chain-of-Thought 的锚定在「第一句话」,ToT 虽加宽搜索但共享上下文仍会锚定。ADHD 用架构手段解决 autoregressive 推理的**过早收敛**
- **两阶段 + 硬墙**：① Diverge——选 N 个认知框架,并行 spawn N 个**完全隔离**的 Agent 调用(零共享上下文,禁止评价);② Focus——独立 critic 打分(novelty/viability/fit)、聚类、剪掉陷阱、深挖 top-K 幸存者。生成器与 critic 是**机械分离**的两次 LLM 调用
- **非显然结论**：同一问题 baseline 只给出教科书式混合方案,ADHD 能揪出「慢模型可能是选错了模型 → 即时中止换更便宜的模型」这类 baseline 根本想不到的答案
- **效果验证**：6 个开放工程问题的独立 LLM 判分中,trap detection 领先 7.67 分(5.2×)、novelty 领先 5.17 分(2.9×),6 题赢 5 题
- **生态**：被 **17+ 项目**采用(repowire、mstack、han 等),上过 The New Stack,有独立论文评审
- **技术栈**：基于 **Claude & Codex Agent SDK**,Node.js / TypeScript

## 如何使用
```bash
npx skills add UditAkhourii/adhd   # 安装 skill(自动识别 ~50 种 agent)
/adhd "你的问题"                     # 显式调用,或让它在 ideation 意图下自动触发

npm install -g adhd-agent          # CLI
adhd "design a rate limiter that survives a leader election"
```

```ts
import { run, renderText } from "adhd-agent";
const result = await run({ problem: "...", framesPerRun: 5, topK: 3 });
console.log(renderText(result));
```

## 对我的价值
把「发散思维」从 prompt 层面提升到架构层面——处理多方案设计、模糊问题排查、创意工作时的强参照。适合在需要创造性和跨学科判断的任务里实践,对比普通单次推理的质量差异;其「隔离发散 + 独立 critic」的结构可迁移到自己的 Agent 工作流。

## 实践心得（待实践）
>
