---
name: "ebook-treasure-chest"
repo_url: "https://github.com/jbiaojerry/ebook-treasure-chest"
article_url: ["https://jbiaojerry.github.io/ebook-treasure-chest/"]
category: "learning"
tags: ["电子书", "资源大全", "epub", "mobi", "azw3", "网盘下载", "静态搜索页", "Python"]
language: "Python"
stars: 21490
status: "收藏"
date_added: "2026-10-22"
---

## 一句话
一个**电子书下载链接宝库**：把帆书（原樊登读书）、微信读书、京东读书、喜马拉雅等平台的热门书整理成 1000 个标签、约 **2.4 万本**的索引，每本提供 **epub / mobi / azw3** 三种格式下载，并配套一个纯静态的在线实时搜索页。

## 内容与亮点
- **规模**：`docs/parse-stats.json` 实测 **24,071 本书 / 1,000 个分类文件**，解析成功率 100%
- **组织方式**：`md/<标签>.md` 每个文件是一个分类，表格三列「书名 | 作者 | epub/mobi/azw3」；README 顶部列出热门分类直达链接，用 `Ctrl+F` 或点标签进入
- **分类覆盖**：文学（2711）、历史（1748）、科普（743）、管理（613）、社会（558）最大；与投研相关的 **投资（365）、金融（370）、经济（487）、股票（115）、量化（8）、私募（4）、巴菲特（15）** 都有独立标签
- **在线搜索页**：`docs/index.html` + 7MB 的 `all-books.json`，纯静态、**实时搜索 + 多关键词（空格分隔）**，可直接部署到任何静态托管
- **数据管线**：`scripts/` 下 Python 负责增量同步书目、解析详情、生成 JSON 与 HTML、自动更新 README 热门分类——仓库本身就是一个「**用脚本维护大型 Markdown 索引**」的完整范例
- **下载链路**：链接指向城通网盘（ctfile），同一分类共用提取码，URL 里已带 `?p=8866`
- **版权声明**：README 与分类页顶部均写明「仅供宽带测试研究，下载后 24 小时内删除，请支持正版」

## 如何使用
**在线找书（推荐）**：打开 GitHub Pages 搜索页，输入书名 / 作者 / 分类，支持空格分隔多关键词。

```
https://jbiaojerry.github.io/ebook-treasure-chest/
```

**仓库内找书**：README 点分类 → 进入 `md/<分类>.md` → 浏览器 `Ctrl+F`，点「下载」进入网盘。

**本地重建搜索数据**（改了自己的 md 之后）：
```bash
git clone https://github.com/jbiaojerry/ebook-treasure-chest
cd ebook-treasure-chest
python3 scripts/parse_md_to_json.py   # md/ → docs/all-books.json + parse-stats.json
python3 scripts/generate_index.py     # → docs/index.html + docs/books.json
```
依赖：仅 Python 3 标准库（`json` / `re` / `pathlib`），无第三方包；搜索页是原生 HTML/JS，无需构建。

## 对我的价值
**找书直接用，别研究代码**——它的价值是「书源索引 + 静态搜索」这套组合，投研写材料时查投资 / 金融 / 经济类书籍、找经典原著的电子版比较省事。

值得借鉴的是它的**内容工程做法**：2000 多万字的索引全靠 Python 脚本从书目源头增量同步、再生成 JSON 和静态搜索页，成本极低却没牺牲检索体验。如果我要维护任何「大清单型知识库」（论文、数据集、工具目录），这套 `md 分类文件 → JSON → 静态搜索页` 的管线可以直接照搬。

**注意事项**：下载依赖第三方网盘与提取码，链接会失效；书籍版权归原作者，属于明显的灰色资源站，个人查阅即可，不要用于再分发或商用。

## 实践心得（待实践）
>
