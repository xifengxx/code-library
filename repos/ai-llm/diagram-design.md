---
name: "diagram-design"
repo_url: "https://github.com/cathrynlavery/diagram-design"
article_url: ["https://mp.weixin.qq.com/s/JJKkzrrf9Rmr62YMkchykQ"]
category: "ai-llm"
tags: ["Agent-skill", "claude-code", "codex", "copilot", "图表", "数据可视化", "SVG", "品牌风格", "Mermaid", "draw.io", "Excalidraw"]
language: "HTML"
stars: 46504
status: "收藏"
date_added: "2026-08-28"
---

## 一句话
Diagram Design 是一个适配 Claude Code、Codex、GitHub Copilot、Factory Droid、Pi 等 AI 编程工具的图表制作 **Agent Skill**，内置 42 种图表类型，专画「编辑级质感」的自包含 HTML+SVG 图——不是一眼假的 AI 生成图，也拒绝 Mermaid 的随手感。

## 内容与亮点
- **核心能力**：42 种图表类型（架构图、流程图、时序图、状态机、ER 图、泳道图、雷达图、桑基图、Wardley 地图、用户旅程图、部署图、UML 类图、数据库表结构图、甘特图、散点图、热力图、瀑布图、鱼骨图、看板、故事地图、依赖图、架构差异图、爆炸轴测图、轴测平面图、极性图等），每种提供 **简约浅色 / 简约深色 / 完整版编辑样式** 3 套静态变体
- **自包含输出**：生成单个 HTML 文件（内嵌 **SVG**），双击浏览器即开，**无构建步骤、不依赖 JS 和外部图片资源**
- **语义化模式**：把「行为」与「布局」解耦——队列、策略链路、信任边界这类语义，可以套用最接近的既有类型，不必为每种语义新增图型
- **可选动效**：静态 HTML 仍是默认输出，仅在有「有序列讲解」需求时才启用 **无障碍友好的动效** 变体
- **无障碍默认开启**：每套模板的内联 SVG 都带 `role="img"`、可解析的 `aria-labelledby`、首子元素 `<title>` / `<desc>`；ID 按图表与变体加前缀，多个 SVG 导出可安全内联到同一页面而不撞无障碍名称
- **品牌风格匹配**：一句话让图自动抓取网站首页提取主色调与字体、映射成语义化角色（`paper` / `ink` / `muted` / `accent` / `link`）并统一套用，内置 **WCAG AA 对比度检查**（9–12px 图表尺寸下不达标会给出调整值并说明原因）；输出 **fidelity receipt** 记录采样 URL、颜色角色、字体族与字重、字体来源 URL、降级情况，公开站点字体直接使用并在渲染后校验，不静默替换成系统字体
- **品牌档案（多客户）**：把一次 onboarding 结果存成具名 profile，在客户项目根加一个含 `profile: <slug>` 的 `.diagram-design` 标记文件即可挂载；标记项目直接读 `~/.diagram-design/profiles/<slug>.md`，多个工作区可用不同品牌而互不覆盖
- **首次运行闸门**：在新项目里首次出图时，若 `style-guide.md` 仍是默认值，Skill 会停下来问「跑 onboarding / 手填 token / 就用默认」，不会把默认皮肤默默塞进有品牌规范的项目
- **导入重绘**：读取已有 **Draw.io / Mermaid / Excalidraw** 源文件，用同一套设计系统重画（内容不变、风格换新），4 个维度可调：输出格式（HTML/SVG/PNG）、尺寸、细节程度、目标受众
- **多 Agent 支持**：Claude Code / Codex / GitHub Copilot / Factory Droid / Pi / Kiro / OpenCode / Claude Cowork 均有原生安装路径，其余 Agent Skills 宿主（Cursor、Cline、Amp、Gemini CLI、Windsurf、Zed 等）可用跨宿主 CLI `npx skills add` 一把装
- **适用**：技术文档、产品方案里需要架构图 / 流程图 / 时序图等配图的场景

## 如何使用
按各 Agent 安装（官方构建只出自本仓库；LittleMight 发布的是插件市场目录，同名其他来源均为非官方副本）：
```bash
# Claude Code
/plugin marketplace add cathrynlavery/diagram-design
/plugin install diagram-design@diagram-design
# 装完跑一次 /plugin → Marketplaces → 选中 diagram-design → Enable auto-update
# （CC 对第三方市场默认关闭自动更新）

# Codex
codex plugin marketplace add cathrynlavery/diagram-design
codex plugin add diagram-design@diagram-design

# GitHub Copilot
copilot plugin marketplace add cathrynlavery/diagram-design
copilot plugin install diagram-design@diagram-design

# Factory Droid
droid plugin marketplace add https://github.com/cathrynlavery/diagram-design
droid plugin install diagram-design@diagram-design --scope user

# Pi
pi install https://github.com/cathrynlavery/diagram-design

# 其余 Agent Skills 宿主（Cursor / Cline / Amp / Gemini CLI / Windsurf / Zed…）
npx skills add cathrynlavery/diagram-design
```
使用：自然语言直接描述，如 `/diagram-design 帮我画一个架构图：前端、后端、数据库、Redis 缓存`；让图匹配品牌风格只需说 `帮 diagram-design 接入 https://yoursite.com 的品牌风格`。
想直接改 `references/style-guide.md` 而不被包更新覆盖，用可编辑安装（clone 后 symlink 内层 skill）：
```bash
git clone git@github.com:cathrynlavery/diagram-design.git ~/code/diagram-design
ln -s ~/code/diagram-design/skills/diagram-design ~/.claude/skills/diagram-design
```
本地翻图：打开 `skills/diagram-design/assets/index.html`，或线上画廊 [cathrynlavery.github.io/diagram-design](https://cathrynlavery.github.io/diagram-design/)（项目站 diagramdesign.dev）。
依赖：上述任一宿主；生成结果本身零额外依赖。仓库另有 `PRIVACY.md` 说明该 Skill 会发送哪些网络请求。

## 对我的价值
用 Claude Code 做投研与项目文档时，架构图 / 流程图 / 时序图是高频配图需求。相比 Mermaid 的无设计感，它能产出与品牌调性一致的编辑级图表，还能把已有 Draw.io / Mermaid / Excalidraw 图一键重绘。**品牌档案**机制对我尤其实用：投研内容往往跨多个主题 / 客户，一次 onboarding 存成 profile，各项目用 `.diagram-design` 标记挂载，就不必反复调色。值得实践：先装 skill，拿一个投研框架图或系统架构图试画，验证风格统一度、对比度检查与 fidelity receipt 的实际体验。

## 更新记录
- **2026-10-09 复查**：Stars 28,047 → **46,504**；图表类型 38 → **42** 种；宿主从 4 个扩到 8 个（新增 **GitHub Copilot、Kiro、OpenCode、Claude Cowork**）+ 通用 `npx skills add` 路径；新增线上画廊与项目站 diagramdesign.dev；默认分支 `main`，MIT 协议，版本 v2.5.10。功能上补入：**语义化模式**（行为与布局解耦，2.3）、**可选无障碍动效**（2.3）、**品牌档案 / 首次运行闸门 / fidelity receipt**、**无障碍默认开启**（SVG 带 `role="img"` + `aria-labelledby`）、**架构差异图 / 爆炸轴测图 / 轴测平面图 / 热力图 / 瀑布图 / 极性图**等新图型，以及 v2.5.10 一次性加进的十种布局语法（桑基、鱼骨、Wardley、看板、用户旅程、部署、依赖图、UML 类图、故事地图、数据库结构）。
- **2026-08-28 入库**：初始条目。

## 实践心得（待实践）
>
