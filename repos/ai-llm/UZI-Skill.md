---
name: "UZI-Skill"
repo_url: "https://github.com/wbh604/UZI-Skill"
article_url: ["https://github.com/wbh604/jilao-skills"]
category: "ai-llm"
tags: ["Agent-skill", "claude-code", "股票分析", "A股", "港股", "美股", "投研", "DCF", "Python", "HTML报告", "多智能体"]
language: "Python"
stars: 7185
status: "研究"
date_added: "2026-10-12"
---

## 一句话
游资（UZI）Skills 是一个 A股 / 港股 / 美股**个股深度分析引擎**的 Agent Skill：输入一只股票，跑 22 维数据 + 若干机构分析方法 + 一组「投资人物评审团」打分，最后吐出一份自包含的 Bloomberg 风格 HTML 报告（附朋友圈竖图 / 微信群战报 / 一句话摘要）。核心卖点是**全免费数据源、零 API key、A 股可直接跑**。

## 内容与亮点
- **五段式 pipeline**：`Task1 取数 → Task2 22维打分 → Task3 评审团 → Task4 综合 → Task5 组装报告`，Task 之间用 **JSON 契约**传递（`assets/data-contracts.md` 定义完整 schema）
- **强制来源标注**：每个维度对象必须含 `data` / `source` / `fallback` 三字段——任何数字都能追溯到来源，并明确标注是否降级取数
- **机械级自查 gate**（最值得抄的部分）：`scripts/lib/self_review.py` 17 项硬检查，报告生成后全过才放行，包括抓占位符残留、抓「评审团给了结论但无实质内容」（`check_panel_hollow_verdicts`）、抓估值与一致性公式异常、事实核查红旗
- **禁用话术清单**：`quality-checklist.md` 明令禁止报告出现「基本面良好」「值得关注」「前景广阔」「建议重视」「存在一定风险」——对抗 LLM 说废话最实用的一招
- **多源 failover 链**：`akshare → efinance → tushare → baostock` 四级降级，可用 `UZI_PROVIDERS_<DIM>` 按维度覆盖优先级，附 `python -m lib.providers` 健康度诊断
- **22 位游资专有规则**：`scripts/lib/seat_db.py` 存游资射程规则，先用 `is_in_range(nickname, ticker_features)` 判断标的是否在其打法射程内，不适用则明确返回「不适合」
- **杀猪盘排查**：独立 skill `trap-detector`，8 个信号逐个扫描并给「命中 / 未命中 / 数据不足」标签，即使判定安全也必须写出评级
- **三档思考深度**：`quick-scan`（30 秒速判）/ `scan-trap`（杀猪盘专项）/ `analyze-stock`（完整 22 维 × 评审团，5–8 分钟）
- **多 agent 支持**：Claude Code 插件市场 / Codex / Cursor / Gemini CLI / OpenClaw，也支持 CLI 直用（`python run.py <ticker>`）
- **同作者姊妹项目**：[jilao-skills](https://github.com/wbh604/jilao-skills) 做主动基金与基金经理行为鉴定——用公开持仓数据逐笔验证买卖行为，**评的是行为不是净值**
- **适用**：A股 / 港股 / 美股个股的快速摸底、多角度交叉提问、报告自动化

## 如何使用
**Claude Code**（注意：必须带 `stock-deep-analyzer:` 命名空间前缀，短名在部分环境不解析）：
```bash
/plugin marketplace add wbh604/UZI-Skill
/plugin install stock-deep-analyzer@uzi-skill
```
```text
/stock-deep-analyzer:analyze-stock 贵州茅台    # 完整 22 维 × 评审团（5-8min）
/stock-deep-analyzer:quick-scan 002217         # 30 秒速判
/stock-deep-analyzer:scan-trap 002217          # 杀猪盘排查
/stock-deep-analyzer:dcf 600519                # DCF 估值专项
```
**CLI 直用**：
```bash
git clone https://github.com/wbh604/UZI-Skill.git && cd UZI-Skill
pip install -r requirements.txt
python run.py 贵州茅台                      # 生成报告
python run.py <ticker> --school F           # 只看 A股游资流派
python run.py <ticker> --versus <t2>        # 多股横向对比
python run.py <ticker> --portfolio <csv>    # 组合健康度
```
**其他 agent**：Codex 让它按 `.codex/INSTALL.md` 安装；Cursor `/add-plugin stock-deep-analyzer`；Gemini CLI `gemini extensions install <repo>`。
数据源配置（可选，提升字段质量）：
```bash
pip install efinance          # 零 key 并行冗余源
export TUSHARE_TOKEN=...      # tushare 官方 API，免费 120 积分，约够跑 50 次
```
依赖：**Python 3.10+**；`akshare` / `baostock` 随 requirements 安装，零 API key 可跑。

## 对我的价值
**领域不重叠，价值在骨架不在内容。** 它覆盖 A股 / 港股 / 美股，数据管道里没有任何链上数据、代币、DeFi 或 RWA 资产类别，和 Web3 / 加密市场主战场无交集。但如果研究工作涉及传统二级市场个股，或要自建研究 Agent，那么真正值得抄的是三样：

1. **JSON 数据契约 + 强制 `source` / `fallback` 字段** —— 把「每个数字可追溯」写成 schema 约束而不是口头纪律，这套做法搬到链上数据研究同样成立
2. **17 项机械级自查 gate** —— 不靠「记得检查」，而是让脚本在报告出炉前逐项卡；尤其 `check_panel_hollow_verdicts` 这种「抓空话」的检查，是 LLM 生成内容质量控制的正确姿势
3. **禁用话术清单** —— 任何 AI 写的研报删掉「基本面良好 / 值得关注 / 前景广阔」这类词，信息密度立刻上来

**不建议照抄的部分**：评审团机制。所谓「66 位大佬」实际输出 50 个 Signal，且本质是**同一个模型用多套提示词自问自答**——它们之间的「分歧」是提示词制造的，不构成观点分散度。22 位游资的打板规则与另一半 DCF / Comps 理论上互不校验（一个看三天一个看十年），并列不等于交叉验证。

**合规提醒**：`akshare` / `efinance` 本质是东财 / 同花顺 / 新浪的聚合爬虫，作者自己在 disclaimer 里承认「字段可能漂移、接口可能变化」。个人盘后研究可用，**但作为私募正式研报的数据源不可引用**。
**时效**：最近一次代码推送 2026-09-05，此后无新提交，v3.9.4 为 2026-09 版本。

## 实践心得（待实践）
>
