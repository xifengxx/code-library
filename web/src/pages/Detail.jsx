import { useParams, Link } from 'react-router-dom'
import ReactMarkdown from 'react-markdown'
import remarkGfm from 'remark-gfm'
import { ArrowLeft, ArrowUpRight, Star, CalendarBlank } from '@phosphor-icons/react'
import { LABELS, fmtStars, repoOgUrl } from '../data/categories.js'

export default function Detail({ data }) {
  const { name } = useParams()
  let decoded
  try {
    decoded = decodeURIComponent(name)
  } catch {
    decoded = name
  }
  const e = data.entries.find((x) => x.name === decoded)

  if (!e) {
    return (
      <div className="detail-missing">
        <p>未找到仓库「{name}」。</p>
        <Link to="/browse" className="btn">返回浏览</Link>
      </div>
    )
  }

  const og = repoOgUrl(e.repo_url)

  return (
    <div className="detail">
      <Link to="/browse" className="back"><ArrowLeft size={14} weight="bold" /> 返回浏览</Link>
      <header className="detail-head">
        {og && (
          <div className="detail-banner">
            <img src={og} alt={e.name} onError={(ev) => { ev.currentTarget.style.display = 'none' }} />
          </div>
        )}
        <h1>{e.name}</h1>
        <div className="detail-links">
          {e.repo_url && (
            <a className="btn" href={e.repo_url} target="_blank" rel="noreferrer">GitHub 仓库 <ArrowUpRight size={14} weight="bold" /></a>
          )}
          {(e.article_url || []).map((u, i) => (
            <a key={u} className="btn ghost" href={u} target="_blank" rel="noreferrer">相关文章 {i + 1} <ArrowUpRight size={14} weight="bold" /></a>
          ))}
        </div>
        <div className="card-meta">
          <span className="badge cat">{LABELS[e.category] || e.category}</span>
          {e.language && <span className="badge">{e.language}</span>}
          {e.stars != null && <span className="badge star"><Star size={11} weight="fill" /> {fmtStars(e.stars)}</span>}
          <span className={`badge status ${e.status}`}>{e.status}</span>
          {e.date_added && <span className="badge"><CalendarBlank size={11} /> {e.date_added}</span>}
        </div>
        <div className="card-tags">
          {(e.tags || []).map((t) => <span key={t} className="tag">#{t}</span>)}
        </div>
      </header>
      <div className="markdown">
        <ReactMarkdown remarkPlugins={[remarkGfm]}>{e.body || ''}</ReactMarkdown>
      </div>
    </div>
  )
}
