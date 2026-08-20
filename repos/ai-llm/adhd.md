---
name: "adhd"
repo_url: "https://github.com/UditAkhourii/adhd"
article_url: ["https://divergent.sh"]
category: "ai-llm"
tags: ["Agent", "思维发散", "Tree-of-Thought", "Claude", "创意", "TypeScript"]
language: "TypeScript"
stars: 3619
status: "收藏"
date_added: "2026-08-17"
---

## 一句话
给 coding agent 用的「发散思维」Skill——用 **Tree-of-Thought + pruning（剪枝）** 架构,硬性解决 AI 过早收敛、想法不够发散的问题。

## 内容与亮点
- **核心洞察**：Chain-of-Thought 的问题不是「不够发散」而是「过早收敛」。ADHD 用架构手段解决 autoregressive 模型天然会走捷径的问题
- **Diverge → Score → Prune → Deepen** 四步流程：选 5 个认知框架（硬件工程师 / 10 岁小孩 / 竞争者视角 / 生物学隐喻 / 速通玩家…）并行生成 N 个完全隔离的想法
- **生成器与评价器之间有硬墙**：分开的 LLM 调用、相反的 system prompt,防止自评偏见
- **适用场景**：架构与设计决策、模糊 debug（无已知根因）、开放性 ideation、命名、战略与高风险判断
- **效果验证**：eval 里 trap detection 领先 7.67 分（5.2 倍）
- **技术栈**：基于 **Claude & Codex Agent SDK**,Node.js / TypeScript

## 如何使用
```bash
# 作为 skill 安装/引用（按 README）
/adhd name this function that batches requests and retries with backoff
/adhd 设计一个能抗 leader election 的 rate limiter
```

## 对我的价值
把「发散思维」从 prompt 层面提升到架构层面——处理多方案设计、模糊问题排查、创意工作时的强参照。适合在需要创造性和跨学科判断的任务里实践,对比普通单次推理的质量差异。

## 实践心得（待实践）
>
