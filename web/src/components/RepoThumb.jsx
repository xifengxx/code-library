import { useState } from 'react'
import { ICONS, repoOgUrl } from '../data/categories.js'

/**
 * 仓库预览图。
 *
 * 图源是 opengraph.githubassets.com —— GitHub 内部端点而非公开 API，
 * 突发并发下会 429。降级策略：渲染「分类图标 + 仓库名」占位，
 * 而不是把 <img> 藏掉（后者会在卡片里留下一条空白带）。
 *
 * variant: 'card'（16:9 缩略图）| 'banner'（21:9 详情页横幅）
 */
export default function RepoThumb({ repoUrl, name, category, variant = 'card' }) {
  // 记录「哪个 src 失败了」而非布尔值：同一实例换仓库时自动复位，不依赖调用方传 key
  const [failedSrc, setFailedSrc] = useState(null)
  const og = repoOgUrl(repoUrl)
  const fallback = !og || failedSrc === og
  const wrapClass = variant === 'banner' ? 'detail-banner' : 'card-thumb'

  if (fallback) {
    const Icon = ICONS[category]
    return (
      <div className={`${wrapClass} thumb-fallback`}>
        {Icon && <Icon size={variant === 'banner' ? 34 : 26} weight="duotone" />}
        <span>{name}</span>
      </div>
    )
  }

  return (
    <div className={wrapClass}>
      <img
        src={og}
        alt={name}
        loading="lazy"
        decoding="async"
        onError={() => setFailedSrc(og)}
      />
    </div>
  )
}
