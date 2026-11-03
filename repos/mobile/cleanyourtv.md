---
name: "cleanyourtv"
repo_url: "https://github.com/Gathin23/cleanyourtv"
article_url: ["https://cleanyour.tv", "https://x.com/gathint/status/2111379569030939102"]
category: "mobile"
tags: ["AndroidTV", "GoogleTV", "debloat", "ADB", "ClaudeCode", "vibe-coding", "Launcher", "隐私"]
language: "Java"
stars: 35356
status: "收藏"
date_added: "2026-10-26"
---

## 一句话
用 **Wi-Fi + ADB** 给 Android TV / Google TV **去广告、禁预装**，再换上一个 Apple TV 风格的极简桌面；整个流程被设计成**由 Claude Code 等 coding agent 照着 `PROMPT.md` 执行**——作者 2026-10-17 发的一条「用 Claude Code 清理父母电视」的推文拿到 740 万浏览，仓库 9 天冲到 3.5 万星。

## 内容与亮点
- **三步式去臃肿**：① 备份已安装包与设置 → ② `pm disable-user` 禁用厂商遥测、广告服务、推荐流和预装（**不卸载**，还原脚本可逐步撤销）→ ③ 安装自研 launcher 并设为默认桌面
- **Agent 原生流程**：克隆仓库后把 `PROMPT.md` 交给 coding assistant，它会**复用仓库里的 `tools/disable.sh` 和 `launcher/build-and-install.sh`**（备份、Home 守护、还原记录都在里面），边做边用电视截图验收，约 15 分钟
- **传播路径本身就是案例**：推文爆火 → 回复里的机型清单变成 `examples/` → 4 天 200+ 贡献者、170+ 机型；原仓库名 `tv-vibehack`；被 TechCrunch、TechRadar、XDA 等 196 篇文章报道
- **Launcher 设计**：dock + top shelf + 应用网格 + 单块玻璃高光 + 三个磨砂按钮（信号源 / 网络 / 设置）+ 时钟屏保；**主题与模块卡**可热切换（`tools/theme.sh` 推送，无需重编）；整包约 520KB
- **机型数据驱动**：`examples/<机型>/tv.json` 一台一档，`tools/gen_tables.py` 自动生成 README 的机型总表——**数据与文档分离**，贡献者只改 JSON
- **覆盖范围**：Android TV / Google TV 全流程可用；**Fire TV 只能去臃肿**（Fire OS 不让第三方接管 Home）；部分中国区 TCL 拒绝安装任何第三方 launcher；Samsung Tizen / LG webOS 不适用
- **许可**：MIT（GitHub 识别为 `NOASSERTION`，因为 LICENSE 后面附了字体授权，实际是标准 MIT）
- **无电脑方案**：社区 App（cleanyour.tv/app）可只靠手机完成连接、分析、清理

## 如何使用
1. **电视端**：设置 → 设备偏好 → 关于 → 连按 **Build** 7 次 → 开发者选项 → 打开 **USB 调试**（若有 Network / ADB debugging 也打开），保持电视开机
2. **电脑端**（与电视同一 Wi-Fi）：
```bash
git clone https://github.com/Gathin23/cleanyourtv
cd cleanyourtv
```
把仓库目录交给 Claude Code / Codex / Gemini CLI，粘贴 `PROMPT.md` 并填入电视型号，按提示回答清单（用哪些 App、dock 放几个、是否保留语音助手 / Chromecast / 系统更新）
3. **电视上确认**：「允许 USB 调试？」，之后 agent 会备份、禁用、编译安装 launcher，并用截图逐步验收

**还原**：仓库带还原脚本（安装时生成了记录），按 `tools/` 里的 restore 流程逐项恢复；因为全程用 `disable-user` 而非卸载，理论上可逆。

## 对我的价值
**双重价值，且第二层比第一层重要。**

第一层是实用：家里 Android TV / Google TV 的广告和预装确实烦，这套「备份 → 禁用不卸载 → 换桌面」的路径风险低、可回滚，比 root 或刷机务实得多。

第二层是**这是我见过最干净的「把人类操作手册交给 Agent」的样本**：
- `PROMPT.md` 不是自然语言教程，而是**给 agent 的任务书**，明确复用仓库内的脚本，避免 agent 即兴写命令
- 每步有**截图验收**和**可回滚记录**，把「agent 操作实体设备」的风险控制住了
- 机型知识以 `examples/*/tv.json` 沉淀，README 由脚本生成——**社区贡献的是数据，不是文档**
它和同期的 `aerial-tv` 指向同一个趋势：**软件开始按「Agent 是执行者、人是审批者」来设计**。做 Agent 工具、写 skill 或自动化 SOP 时，这套结构（任务书 + 固定脚本 + 验收证据 + 数据化知识）可以直接抄。

**必须注意**：
- 项目**只有 9 天**、3.5 万星、239 个 open issue，脚本仍在快速演进，别把它当稳定产品
- 在实体电视上跑 `pm disable-user` 前，先读 `tools/disable.sh` 和 `PROMPT.md`，确认没有禁用你要用的组件（尤其国产电视的语音、投屏、系统更新）
- 中国区电视的系统组件命名与海外差异大，务必对照 `examples/` 里同品牌机型，不要照搬海外清单
- ADB 调试等于局域网内开放调试入口，用完后建议关掉

## 实践心得（待实践）
>
