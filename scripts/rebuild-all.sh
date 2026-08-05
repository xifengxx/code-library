#!/usr/bin/env bash
# rebuild-all.sh — 入库后一键重建三个版本：MD 索引 + 网页数据 + Word 文档
# 用法：bash scripts/rebuild-all.sh
set -euo pipefail
cd "$(dirname "$0")/.."

echo "① MD 索引 + 网页数据"
node scripts/build-index.mjs

echo ""
echo "② Word（pandoc 快速版）"
bash scripts/build-word.sh

echo ""
echo "③ Word（python-docx 精装版）"
python3 scripts/build-word-fancy.py

echo ""
echo "🎉 三个版本已同步："
echo "   MD    output/README.md（总索引）"
echo "   Web   web/src/data/repos.json（dev server 热更新，浏览器刷新即见）"
echo "   Word  output/word/（每分类 docx + 全量 + 精装版）"
