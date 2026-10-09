---
name: "handraw-style"
repo_url: "https://github.com/yang0/handraw-style"
article_url: []
category: "ai-llm"
tags: ["Agent-skill", "codex", "提示词", "AI绘画", "手绘风格", "风格参考图", "双语提示词"]
language: "HTML"
stars: 2150
status: "收藏"
date_added: "2026-09-18"
---

## 一句话
手绘风格提示词库 / Agent Skill：收录 **001–267 号手绘画风**并配编号画廊，用户只需报「编号 + 主题」，就能拿到带风格名称的中英文提示词；显式要求生图时，还会按当轮生图模型的能力判断是否要附带对应编号的参考图。

## 内容与亮点
- **编号化风格库**：`references/styles.json` 存 267 条风格条目，每条含 `number` / `group` / `reference`（原参考作者或风格名）/ `generation_name`（生成的风格名）/ `traits`（核心视觉特征）
- **八组分类**（对应编号区间）：A 国际社论漫画与幽默手绘（001–035）、B 国际绘本与叙事型手绘（036–054）、C 现代平面与艺术化人物（055–082）、D 日本作者当代插画（083–123）、E 中国作者当代插画（124–154）、F 通用网感 / 媒介 / 地域手绘（155–200）、G 中国当代插画补充（201–216）、H 其他（217–267）
- **编号画廊**：`gallery/index.html` 浏览 **九宫格拼图**（`images/A_001-016.png` 这类分组合图），看中哪张记下编号即可；`images/individual/{bucket}/{number}.png` 是对应单图，**每 200 号分一个桶**（001-200、201-400）
- **能力感知的参考图策略**（核心设计）：生图优先「作者名 + 风格名」直接激活（如 `001` 无需传图）；不行则「作者名 + 风格名 + 正向核心特征」仍不传图；都激活不了才传该编号单图。**判断只基于模型能否被文本激活，与作者是否著名、是否在世无关**，`references/model_capabilities.json` 目前按 `gpt-image-2` 建立首轮清单
- **参考图隔离块**：凡传图必注入一段中英双语约束，只允许提取线条 / 笔触 / 媒介 / 色彩倾向，明确禁止沿用参考图的主体、构图、背景、文字与故事，画面内容一律以用户主题为准
- **默认只出提示词**：不显式说「生图」就不调用生图工具；输出的中英提示词只描述主题与用户给的约束，不堆砌风格形容词、构图建议、画质词或负面提示词
- **配套脚本**：`build_library.py`（重建索引与画廊）、`split_contact_sheets.py`（拼图切单图）、`validate_library.py`（校验源文件 / 索引 / 画廊一致性）、`prompt_style.py`（CLI 出稿）、`resolve_reference.py`（按模型 + 编号确定性判定要不要传图，输出 `activation_source` 与过滤后的 `prompt_traits`）
- **另含两个维护型 Skill**：`.agents/skills/style-library-importer` 与 `tweet-style-importer`，用于从推文等外部来源导入新风格
- **适用**：做公众号 / 小红书 / 短视频 / 品牌内容，需要固定视觉气质又描述不来画风的人

## 如何使用
按 Codex 的 skill-installer 安装，**必须装到仓库根目录 `.`**，不要只装 `handdraw-style-prompter/` 子目录——根目录同时含画廊 `images/` 与嵌套 Skill：
```bash
$skill-installer install --repo yang0/handraw-style --path . --name handdraw-style-prompter --ref master
```
Claude Code 用户可直接把仓库克隆进 skills 目录（保持根目录结构不变即可，SKILL.md 在根目录作为入口，操作契约在 `handdraw-style-prompter/SKILL.md`）：
```bash
git clone https://github.com/yang0/handraw-style.git ~/.claude/skills/handraw-style
```
用法：先打开 `handdraw-style-prompter/gallery/index.html` 挑编号，再输入「编号 + 主题」：
```text
041号风格，主题：秋天的第一杯奶茶
210号风格，主题：小男孩在雪地里点鞭炮
193号风格，主题：大唐夜宴
```
辅助命令（在包根目录执行）：
```bash
python handdraw-style-prompter/scripts/build_library.py       # 重建索引 + 画廊
python handdraw-style-prompter/scripts/validate_library.py    # 校验一致性
python handdraw-style-prompter/scripts/resolve_reference.py --model gpt-image-2 --style 18
```
依赖：Codex（skill-installer）或 Claude Code；脚本需 **Python 3**，无第三方包依赖。仓库体积约 107 MB，主要是 267 张单图与分组拼图。

## 对我的价值
投研内容配图经常需要「稳定视觉气质」——同一套图里风格不能漂。这个库把「描述画风」变成「报编号」，正好解决提示词反复调试的问题。值得参照的两点：一是 **风格资产的编号化索引 + JSON 元数据**（编号 / 分组 / 参考作者 / 生成风格名 / 核心特征五字段），这套结构可以直接搬到自己的配图工作流；二是 **能力感知的「先文本激活、不行再传图」策略**——传参考图会锁死主体和构图，这是生图提示词工程里很容易踩的坑，它的分级降级逻辑和参考图隔离块写法可直接复用。适合场景：自媒体配图、投研图示、品牌视觉统一。值得手动实践：挑 2–3 个编号，同一主题跨编号生成，对比风格区分度是否真的够。

## 实践心得（待实践）
>
