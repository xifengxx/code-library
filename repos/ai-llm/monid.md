---
name: "monid"
repo_url: "https://github.com/monid-ai/monid"
article_url: ["https://monid.ai", "https://docs.monid.ai", "https://monid.ai/tools"]
category: "ai-llm"
tags: ["AI-agent", "工具网关", "API聚合", "MCP", "Deno", "TypeScript", "connector", "用量计费", "爬虫", "数据补全"]
language: "TypeScript"
stars: 3100
status: "研究"
date_added: "2026-10-09"
---

## 一句话
Monid 自称「agent 工具界的 **OpenRouter**」——用**一个 base URL + 一个 key** 让 agent 访问数百个第三方 API（网页搜索与抓取、人物/公司信息补全、社媒、评论与市场数据、视频/图像/语音生成）。本仓库不是服务本身，而是它的**连接器层**：一套声明式框架，用纯 TypeScript 定义就能描述任意 API「怎么调、收什么、返什么、怎么计费」。

## 内容与亮点
- **三个动词，前两个免费**：`discover` 按「要干的活」跨所有 provider 给整个目录排序；`inspect` 返回单个 endpoint 的完整契约；`run` 才真正执行并计费
- **每次调用时才选 endpoint**：`discover` 返回的每个候选都带**价格、实时健康状态、观测到的 p50/p95 延迟**，外加「有更便宜/更合适的选择」提示——API 不提前在代码里写死
- **计费锚在「网线上」**：每个 connector 自己声明用量模型（按次 / 按返回条数 / 按单位量如每千字符、每秒视频），引擎在**原始响应信封**上结算，且**在任何 output 映射之前**——所计即所返
- **错误即数据**：vendor 报了非 2xx、没匹配到公司、人物没解析出来，这些一律「成功完成、结算为零」，而非抛异常；运行期违反声明契约才算独立错误类
- **声明式 connector**：没有 client、没有 adaptor、**没有 per-provider 执行分支**；`defineProvider` 声明身份/认证/用量，`defineEndpoint` 声明请求与 zod 输入 schema
- **一份产物跑三种环境**：编译时把函数替换成内容哈希引用、按 **git-blob 风格去重**（哈希兼任防篡改），endpoint 从「**sealed unit**」（文档 + 实际引用的函数，按值传入引擎）执行——本地用自己的 vendor key、CI 里 replay fixtures 零网络、托管平台上凭证在 **transport 内部注入、永不进入引擎进程**
- **引擎流水线对每个 provider 完全一致**：校验 input → `toRequest` 构建请求（此时 auth 尚未执行）→ transport 执行并注入凭证 → `usage.consolidate` 在原始信封上结算 → `output.fromResponse` 映射 → 最终输出再校验
- **资源模型**：像 Saperly 电话号这种「持久且属于用户」的产品额外声明 **resource**（快照结构、verify/release/refresh 生命周期、实时视图、费率卡），endpoint 按用途绑定后由引擎推导出所有权门控与释放/续期逻辑
- **让 agent 自己写 connector**：`AGENT.md` 是交给编码 agent 的说明书，配上你自己的 API 文档和参考实现 `connectors/exa/` 即可产出 provider + schema + 测试；Apify 系还有 `deno task apify:scaffold <actorId>` 直接读 actor 的发布 schema 生成静态 zod
- **测试不需要 vendor key**：188 个 replay 测试跑 fixture，零网络；live 测试仅在环境里有该 provider 凭证时才跑，否则跳过（变量名格式 `<PROVIDER>_CREDENTIALS_<FIELD>`）
- **适用**：agent 需要调用大量付费第三方 API、且要按次准确计费的场景；也可作为「声明式 API 网关」的架构参照

## 如何使用
仓库是 Deno 项目，需 **Deno 2.x**：
```bash
git clone https://github.com/monid-ai/monid.git
cd monid

deno task check && deno task test        # 类型检查 + 188 个回放测试，零网络
```
用自己的 vendor key 跑真实 endpoint：
```bash
export TINYFISH_CREDENTIALS_API_KEY=...
deno task engine:run 'tinyfish#search' \
  --query-params '{"query":"solid-state battery suppliers","domain_type":"news"}'
```
浏览编译后的目录：
```bash
deno task catalog providers                  # 有哪些 provider
deno task catalog endpoints --provider exa   # 某个 provider 下有哪些
deno task catalog inspect 'exa#search'       # 单个 endpoint 的完整契约
```
写一个新 connector（新增 API = 提交一个 PR）：
```bash
# 目录结构
connectors/<name>/
├── provider.ts                  # defineProvider：name / meta / auth / defaults
├── schema/                      # provider 级共享 zod（2 个以上 endpoint 复用）
└── endpoints/<endpoint>/
    ├── endpoint.ts              # defineEndpoint（id 自动推导为 "<provider>#<endpoint>"）
    ├── schema/inputs.ts         # 该 endpoint 的请求 schema
    ├── endpoint.test.ts         # 回放 + 门控 live 测试
    └── fixtures/*.json          # 录制的响应（需裁剪）
```
```bash
deno task record    # 录 fixture
```
面向 agent 的用法（**会安装全局 CLI，需你自己决定**）：README 指示 agent 抓取 `https://monid.ai/SKILL.md` 存入 skill 目录，该 skill 让 agent 执行 `npm install -g @monid-ai/cli@latest && monid setup`，再到 app.monid.ai 建账号、生成 API key 后用 `monid keys add` 写入。
依赖：Deno 2.x（仓库本身零第三方运行时依赖）；托管平台侧需 monid.ai 账号与 API key。

## 对我的价值
**它的价值不在「聚合了哪些 API」，而在三个可复用的工程范式**，做任何「调用第三方付费 API 并计费」的系统都能直接抄：
1. **用量结算锚在原始响应信封、且在 output 映射之前** —— 把「计费依据」和「业务逻辑」彻底解耦，避免映射层出错导致计费漂移；「错误即数据、结算为零」也是比抛异常更省心的语义
2. **声明式 connector + 编译期哈希引用 + sealed unit** —— 没有 per-provider 分支意味着接入成本是线性可加的，agent 可自动生成；哈希去重兼做防篡改也很巧
3. **凭证永不进入引擎进程、在 transport 内部注入** —— 这是多租户/托管场景下最容易被做错的一环
另外 `meta.description` 要「像写产品一样写」这个观点值得借鉴：它同时是 `discover` 排序和 `inspect` 返回的文本，**description 就是 agent 眼里的产品**，甚至要在里面写明「什么不做、该换用哪个 endpoint」。
**注意**：README 宣称「2,000+ 工具 / 72+ provider」，但仓库 `connectors/` 实际只有 **31 个**目录；两者口径不一致，评估真实覆盖度请看 monid.ai/tools 而非 README 数字。

## 实践心得（待实践）
>
