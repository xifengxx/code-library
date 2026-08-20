import { Link } from 'react-router-dom'
import { Star } from '@phosphor-icons/react'
import { LABELS, fmtStars, repoOgUrl } from '../data/categories.js'

const MAX_TAGS = 4

export default function Card({ e }) {
  const summary = (e.sections?.['一句话'] || '').replace(/\n+/g, ' ')
  const stars = fmtStars(e.stars)
  const og = repoOgUrl(e.repo_url)
  const tags = e.tags || []
  const visibleTags = tags.slice(0, MAX_TAGS)
  const extraTags = tags.length - MAX_TAGS
  return (
    <article className="card">
      {og && (
        <div className="card-thumb">
          <img
            src={og}
            alt={e.name}
            loading="lazy"
            onError={(ev) => { ev.currentTarget.style.display = 'none' }}
          />
        </div>
      )}
      <Link to={`/repo/${encodeURIComponent(e.name)}`} className="card-title">
        <h3>{e.name}</h3>
      </Link>
      <div className="card-meta">
        <span className="badge cat">{LABELS[e.category] || e.category}</span>
        {e.language && <span className="badge">{e.language}</span>}
        {stars && <span className="badge star"><Star size={11} weight="fill" /> {stars}</span>}
        <span className={`badge status ${e.status}`}>{e.status}</span>
      </div>
      <p className="card-summary">{summary || '（暂无一句话简介）'}</p>
      <div className="card-tags">
        {visibleTags.map((t) => <span key={t} className="tag">#{t}</span>)}
        {extraTags > 0 && <span className="tag more" title={tags.slice(MAX_TAGS).map((t) => '#' + t).join(' ')}>+{extraTags}</span>}
      </div>
    </article>
  )
}
