---
name: "cult-ui"
repo_url: "https://github.com/nolly-studio/cult-ui"
article_url: ["https://www.cult-ui.com", "https://www.cult-ui.com/docs", "https://www.cult-ui.com/llms.txt"]
category: "frontend"
tags: ["React", "shadcn", "Tailwind", "Motion", "组件库", "动画", "TypeScript", "Nextjs", "Agent", "MCP"]
language: "TypeScript"
stars: 6843
status: "收藏"
date_added: "2026-10-29"
---

## 一句话
给 **shadcn/ui** 补上「动起来的那一半」：**150+ 个免费动画组件**（弹窗、卡片、Dock、动态岛、3D 地球、看板、Mac 截图框、玻璃拟态……），全部以 **shadcn registry** 形式分发，`npx shadcn add` 一条命令把源码拷进你的项目；文档同时为人和 coding agent 写，MIT 永久免费。

## 内容与亮点
- **定位**：不是又一套完整组件库，而是**「Shadcn, expanded」**——你已有 shadcn 的基础组件，cult-ui 提供它缺的动画化交互组件；组件用 **Tailwind CSS v4 + shadcn 主题 token**，动效主流用 **Motion**（原 Framer Motion），能无缝继承你的主题色和暗色模式
- **分发方式即卖点**：每个组件是一个 registry item，CLI **复制源码而非装依赖**，所以代码归你所有、可随意改；支持两种装法——直接给 URL，或一次注册命名空间后按名字装
- **组件覆盖广**：交互（**dynamic island**、dock、popover 变体）、卡片（shift card、folded card）、插画与设备壳（**mac screen**、fluted glass）、数据可视化（**analytics chart**、**globe**）、应用级（**kanban board**）；2026-10 一次性加了 58 个
- **Agent-first 文档**（这套做法最值得抄）：`llms.txt` 索引全部页面、`llms-full.txt` 整个文档站打包成单文件、**任意 docs URL 加 `.md` 后缀**即得干净 Markdown；再接上 **shadcn MCP server**，Cursor / Claude Code / VS Code 可以直接在对话里检索并安装组件
- **仓库自身也在吃这套**：`apps/www` 下同时有 `AGENTS.md` 和 `CLAUDE.md`，根目录还有 `.agents/skills`、`.claude/skills`、`.cursor`——**同一份 skill 喂多个 agent**
- **工程结构**：**pnpm workspace + Turborepo** 单仓，只有一个 workspace `apps/www`（没有独立 `packages/`），文档站是 **Next.js + Fumadocs** + MDX，组件源码走 `registry.json` / `__registry__` 注册，`vitest` 做测试
- **商业模式**：组件免费（MIT），收入来自同工作室的 **AI SDK Agents**（100+ Vercel AI SDK agent 模板）和 Nolly Studio 的服务生意——**开源库当流量入口**，README 里明说「你这套库是 AI SDK Agents 养着的」

## 如何使用
**方式一：按 URL 直接装（不用配置）**
```bash
npx shadcn@latest init      # 项目里还没有 shadcn 时先初始化
npx shadcn@latest add https://www.cult-ui.com/r/shift-card.json
```

**方式二：注册命名空间后按名字装（推荐，长期用）**
```json
{
  "registries": {
    "@cult-ui": "https://www.cult-ui.com/r/{name}.json"
  }
}
```
写进 `components.json` 后：
```bash
npx shadcn@latest add @cult-ui/shift-card
```

**方式三：让 Agent 装**——先把 `https://www.cult-ui.com/llms.txt` 或 `https://www.cult-ui.com/docs/mcp-server` 喂给 agent，或启用 shadcn MCP server，然后用自然语言让它挑组件并安装。

**依赖与前提**：React + **Tailwind CSS v4**（v3 老项目需要先升级或手动适配 token）、shadcn/ui 已初始化；每个组件的 docs 页单独列出自身依赖（多数是 `motion`，少数涉及 three.js / recharts 等）。

## 对我的价值
**做前端 demo、投研看板、个人站时，这是「视觉效果立刻上一个档次」的最短路径。** 自己做动效成本很高（Motion 的物理参数、暗色适配、可访问性都要调），cult-ui 直接给能跑的源码，还能按项目主题改。RWA / Crypto 的路演页面、数据看板、产品落地页用动态岛、地球、analytics chart 这些能明显拉高质感。

**第二层价值是「Agent 友好的文档设计」范本**，和库里已收的 aerial-tv、cleanyourtv 是同一脉络：
- `llms.txt` + `llms-full.txt` + `.md` 后缀三件套，几乎是现在文档站的标准动作，自己的项目该照做
- 把组件 registry 接到 shadcn MCP server，让 agent「检索 + 安装」闭环——**分发渠道本身就是 agent**
- 仓库里 `.claude/skills`、`.agents/skills`、`.cursor` 并存，说明多 agent 共用一套 skill 已成常规做法

**注意**：
- 150+ 组件的**质量与维护深度不齐**，新加的 58 个是批量产出，用前先看 demo 和 issue
- 依赖 Tailwind v4，老项目迁移有成本；组件是「复制进项目」，**升级要手动重新拉**，不是 `npm update` 能解决的
- 作者是商业工作室，README 里 AI SDK Agents 的推广位很重，属正常但需留意「免费」的边界
- MIT 可商用，但组件里的插画 / 素材授权另算，商用前逐个确认

## 实践心得（待实践）
>
