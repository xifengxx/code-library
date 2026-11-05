---
name: "cicada"
repo_url: "https://github.com/wquguru/cicada"
article_url: ["https://cicada.indaloop.app"]
category: "tools"
tags: ["实时字幕", "同声传译", "会议纪要", "语音识别", "翻译", "macOS", "SwiftUI", "开源"]
language: "Swift"
stars: 1424
status: "收藏"
date_added: "2026-11-05"
---

## 一句话
「知了」是一款跨平台（Mac / Windows / Linux / Android）免费开源的实时字幕、同声传译与 AI 会议纪要工具——任何会议或直播都能实时出双语字幕、边听边写结构化纪要，Mac 版全部本机识别、声音不出电脑。

## 内容与亮点
- **实时纪要与双语文字记录**：边听边整理总结、议题要点、结论、待办、**鱼骨图**和人名术语表；点结论/待办可跳回原话；能统一人名术语写法并记下听错变体，`⌘F` 连识别错的写法一起搜
- **实时字幕**：本地自动识别语言并翻成系统语言；字幕条只在有人说话时出现、鼠标划过自动变透明
- **同声传译**：按住右 `⌥` 说话，对方在会议软件里直接听到翻译语音；支持 **8–30 秒录音克隆自己的声音**；通过虚拟麦克风 BlackHole 2ch 实现，不往会里塞机器人、对方无感
- **线下/混合会议**：「会议室」模式用麦克风听桌边发言，扬声器念译文；「电脑和会议室」模式（macOS 26）两边各认各的语言记进同一份记录，用系统回声消除去重
- **本机优先 + 隐私**：Mac 上声音采集、语音识别（Apple **SpeechAnalyzer** / SFSpeechRecognizer）、录音全在本机；无统计、无埋点、无自建服务器；纪要窗屏幕共享拍不到
- **模型编排**：不填 key 时 Apple 本机模型 + Google 翻译全功能可用；填 Ling key（蚂蚁集团）后解锁实时纪要、一步语音翻译、声音克隆，约 0.15–1 元/小时；也可换 **OpenRouter / ZenMux / 任意 OpenAI 兼容服务**
- **会议记录**：双语记录、纪要、原始录音全存本机；**WeSpeaker 声纹模型**本机区分说话人；录音/视频文件可拖入离线转写；导出 Markdown / Word / SRT
- **工程亮点**：Mac 版零第三方依赖，仅 Xcode CLT 即可构建；四平台共用版本号与会议记录格式

## 如何使用
```bash
# 从 Releases 或官网下载安装包（Mac: DMG / Windows: 安装包 / Linux: tar.gz / Android: APK）
# https://github.com/wquguru/cicada/releases/latest

# Mac 版要求 macOS 14.4+、Apple 芯片；不填 key 也能用（本机识别）
# 可选：配置 Ling API key（https://chat.ant-ling.com/platform/api，每月赠 10 元额度）

# Linux 安装
tar xzf Cicada-<版本>-Linux.tar.gz && cicada-linux/install.sh

# Mac 从源码构建（零第三方依赖）
scripts/build.sh      # 开发版 → build/Cicada.app
scripts/package.sh    # 打包正式版 DMG + SHA-256 校验
```

## 对我的价值
两个层面的参照：① 直接工具——听英文直播/会议时实时双语字幕和纪要，投研场景下听 Bloomberg、电话会可直接出中文纪要，Mac 版本机识别不泄密；② 架构参照——「本机识别 + 云端 LLM 编排 + 多服务降级链（Ling→Google→Apple 本机）」的设计、生成器/记录的会议数据格式、跨平台共享一套记录格式的做法，对做语音类 AI 产品很有参考价值。

## 实践心得（待实践）
> 用户手动实践后，把踩坑、结论、是否推荐写在这里。未实践前保留「待实践」。
