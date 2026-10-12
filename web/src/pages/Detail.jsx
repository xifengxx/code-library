import { useParams, Link } from 'react-router-dom'
import ReactMarkdown from 'react-markdown'
import remarkGfm from 'remark-gfm'
import { ArrowLeft, ArrowUpRight, Star, CalendarBlank } from '@phosphor-icons/react'
import { LABELS, fmtStars } from '../data/categories.js'
import RepoThumb from '../components/RepoThumb.jsx'

// 链接标签：优先给读者有信息量的名字，而不是「相关文章 N」。
// 裸域名对 mp.weixin.qq.com / github.com 是无信息量的，单独处理。
function linkLabel(u) {
  let host, seg
  try {
    const url = new URL(u)
    host = url.hostname.replace(/^www\./, '')
    seg = url.pathname.split('/').filter(Boolean)
  } catch {
    return '相关链接'
  }
  if (host === 'mp.weixin.qq.com') return '微信公众号'
  if (host === 'github.com' && seg.length >= 2) return seg[1]
  if (seg.length) {
    const first = seg[0].length > 16 ? `${seg[0].slice(0, 15)}…` : seg[0]
    return `${host}/${first}`
  }
  return host
}

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

  return (
    <div className="detail">
      <Link to="/browse" className="back"><ArrowLeft size={14} weight="bold" /> 返回浏览</Link>
      <header className="detail-head">
        <RepoThumb repoUrl={e.repo_url} name={e.name} category={e.category} variant="banner" />
        <h1>{e.name}</h1>
        <div className="detail-links">
          {e.repo_url && (
            <a className="btn" href={e.repo_url} target="_blank" rel="noreferrer">GitHub 仓库 <ArrowUpRight size={14} weight="bold" /></a>
          )}
          {(e.article_url || []).map((u) => (
            <a key={u} className="btn ghost" href={u} target="_blank" rel="noreferrer" title={u}>{linkLabel(u)} <ArrowUpRight size={14} weight="bold" /></a>
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
