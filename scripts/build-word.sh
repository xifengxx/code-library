#!/usr/bin/env bash
# build-word.sh — pandoc 快速版：MD → docx（每分类一份 + 全量一份）
# 依赖：pandoc（brew install pandoc）
set -euo pipefail
cd "$(dirname "$0")/.."

if ! command -v pandoc >/dev/null 2>&1; then
  echo "❌ 未安装 pandoc，请先执行：brew install pandoc"
  exit 1
fi

OUT=output/word
mkdir -p "$OUT"

collect() { # collect <glob> → 以换行分隔输出排序后的 .md 文件列表
  find "$1" -name '*.md' | sort
}

# 全量：所有条目合并为一个 docx，带目录
ALL=()
while IFS= read -r f; do ALL+=("$f"); done < <(collect repos)
if [ ${#ALL[@]} -gt 0 ]; then
  pandoc --toc --toc-depth=2 -f markdown -t docx "${ALL[@]}" -o "$OUT/全部仓库索引.docx"
  echo "✅ $OUT/全部仓库索引.docx (${#ALL[@]} 条)"
fi

# 每分类一份
for dir in repos/*/; do
  [ -d "$dir" ] || continue
  name=$(basename "$dir")
  FILES=()
  while IFS= read -r f; do FILES+=("$f"); done < <(collect "$dir")
  [ ${#FILES[@]} -eq 0 ] && continue
  pandoc --toc -f markdown -t docx "${FILES[@]}" -o "$OUT/${name}.docx"
  echo "✅ $OUT/${name}.docx (${#FILES[@]} 条)"
done

echo "🎉 Word 全部生成到 $OUT/"
ls -lh "$OUT" | awk 'NR>1 {print "   " $NF "  " $5}'
