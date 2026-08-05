import { Link } from 'react-router-dom'
import { LABELS, fmtStars } from '../data/categories.js'

export default function Card({ e }) {
  const summary = (e.sections?.['一句话'] || '').replace(/\n+/g, ' ')
  const stars = fmtStars(e.stars)
  return (
    <article className="card">
      <Link to={`/repo/${encodeURIComponent(e.name)}`} className="card-title">
        <h3>{e.name}</h3>
      </Link>
      <div className="card-meta">
        <span className="badge cat">{LABELS[e.category] || e.category}</span>
        {e.language && <span className="badge">{e.language}</span>}
        {stars && <span className="badge star">⭐ {stars}</span>}
        <span className={`badge status ${e.status}`}>{e.status}</span>
      </div>
      <p className="card-summary">{summary || '（暂无一句话简介）'}</p>
      <div className="card-tags">
        {(e.tags || []).map((t) => <span key={t} className="tag">#{t}</span>)}
      </div>
    </article>
  )
}
