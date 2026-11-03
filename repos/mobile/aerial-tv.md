---
name: "aerial-tv"
repo_url: "https://github.com/pengchujin/aerial-tv"
article_url: ["https://aerial.qust.me", "https://aerial.qust.me/agent.md"]
category: "mobile"
tags: ["AndroidTV", "电视桌面", "Kotlin", "tvOS", "无广告", "ADB", "Agent", "开源"]
language: "Kotlin"
stars: 5058
status: "收藏"
date_added: "2026-10-26"
---

## 一句话
给国产电视换一块**干净的 tvOS 风格桌面**：没有广告和推荐流，只有 App、壁纸和航拍屏保；通过 ADB 安装、不 root、不动系统应用、可一键还原，**安装步骤专门写成了让 AI Agent 代跑的说明**。

## 内容与亮点
- **桌面设计**：常用 App 放在屏幕下方**玻璃底板**，往下是全部 App 网格；长按 OK 可移动 / 建文件夹 / 隐藏 / 卸载；HDMI 信号源可自定义成 Apple TV、PS、Switch、Xbox 图标
- **手机远程整理**：扫电视上的二维码，手机上出现同样的图标网格，可拖动排序、改名、换图标，也能把 HDMI 加进主屏
- **控制中心 + 屏保 + 壁纸**：信号源 / 网络 / 设置 / 音量 / 亮度 / 个性化；屏保收录 **Apple TV 的 114 段航拍影片**（支持 4K / 杜比视界），也可换照片、时钟或本地视频；壁纸支持必应每日精选、内置 14 张、手机传图
- **接管机制（最硬核的部分）**：国产电视只认自家桌面且待机清后台，Aerial 用**无障碍服务**检测前台窗口、原桌面一出现就切回来（不读屏幕内容），被清理后靠**通知监听**复活（不读通知）；老小米 Android 6 改看系统用量统计；原生 Android TV 可直接设默认桌面
- **Agent-first 安装**：把一段 prompt 发给 Claude Code / Codex / Gemini CLI / 豆包电脑版等，按 `agent.md` 自己跑 adb 命令并**用三条验收命令的输出自证装好**
- **机型适配矩阵**：小米 / TCL / 雷鸟 / 索尼 / 创维 / 康佳 / 海信 / 极米 / 各种盒子和投影按 ✅⚠️❌ 标注，每台有独立笔记（`docs/devices/`），来源是用户反馈
- **工程规格**：Kotlin，JDK 17 + Android SDK 36，产物分 **standard / guard** 两个 APK，MIT 许可

## 如何使用
**让 Agent 装（作者推荐）**——把这段发给能在电脑上执行命令的 Agent：
```text
请帮我把开源电视桌面 Aerial 装到我的电视上，并设为开机进入的桌面。
电视 IP：<电视IP>
保持 ADB 常开：要
安装说明在这里：https://aerial.qust.me/agent.md
请先完整读完安装说明再动手，然后在我的电脑上亲自运行命令。
最后把验收命令的原始输出贴给我。
```

**一行命令（macOS / Linux）**：
```bash
curl -fsSL https://aerial.qust.me/install.sh | KEEP_ADB=1 TV=192.168.1.20 bash
```

**手动 adb**：
```bash
adb connect 192.168.1.20:5555
adb install -r aerial-standard.apk
adb shell pm grant app.orchard.tv android.permission.WRITE_SECURE_SETTINGS
adb shell cmd notification allow_listener app.orchard.tv/app.orchard.tv.guard.RevivalListener
adb shell appops set app.orchard.tv SYSTEM_ALERT_WINDOW allow
adb shell am start -n app.orchard.tv/.MainActivity
```

**还原**：
```bash
curl -fsSL https://aerial.qust.me/install.sh | TV=192.168.1.20 bash -s restore
```
前提：电脑与电视同一局域网，电视开启 ADB 调试（README 给了小米 / TCL / 海尔 / OPPO 的分品牌开法）。LG webOS、三星 Tizen、鸿蒙**不支持**；开机广告由固件播放，去不掉。

## 对我的价值
**直接可用**——如果家里是小米 / TCL 这类国产电视，这是目前少有的「无 root、可还原、有真实机型反馈」的换桌面方案。

更值得研究的是它的**分发方式**：把安装文档写成 `agent.md`，内置验收命令，让 coding agent 代替人执行跨设备操作，并给出可核验的输出（`mCurrentFocus` 里有没有 `app.orchard.tv`）。这是「**软件以 Agent 为用户**」的一个干净样本——不是给 Agent 做插件，而是把「人类照文档点来点去」改成「Agent 读文档跑命令，人只负责确认」。做 vibe coding 或 Agent 工具时可以直接借鉴这套「说明 + 自检 + 可回滚」的结构。

另外，它对国产电视固件差异的处理（无障碍窗口检测 → 通知监听复活 → 用量统计兜底）是 Android 兼容性工程的实用案例。

**注意**：项目 2026-10 才发布，非常新；ADB 常开等于在局域网里留了一个调试入口，装完如果不需要升级可以用 `KEEP_ADB=0`。

## 实践心得（待实践）
>
