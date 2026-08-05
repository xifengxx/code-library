import { useMemo, useState } from 'react'
import { useSearchParams } from 'react-router-dom'
import Card from '../components/Card.jsx'
import { CATEGORIES, LABELS } from '../data/categories.js'

export default function Browse({ data }) {
  const [params, setParams] = useSearchParams()
  const cat = params.get('cat') || 'all'
  const [q, setQ] = useState('')

  const filtered = useMemo(() => {
    const kw = q.trim().toLowerCase()
    return data.entries.filter((e) => {
      if (cat !== 'all' && e.category !== cat) return false
      if (!kw) return true
      const hay = [e.name, e.language, ...(e.tags || []), JSON.stringify(e.sections || {})].join(' ').toLowerCase()
      return hay.includes(kw)
    })
  }, [cat, q, data])

  const count = (c) => data.entries.filter((e) => e.category === c).length

  return (
    <div className="browse">
      <h1>浏览仓库</h1>
      <input
        className="search"
        placeholder="🔍 搜索名称 / 语言 / 描述 / 标签…"
        value={q}
        onChange={(e) => setQ(e.target.value)}
      />
      <div className="chips">
        <button className={cat === 'all' ? 'chip active' : 'chip'} onClick={() => setParams({})}>全部 {data.entries.length}</button>
        {CATEGORIES.map((c) => (
          <button key={c} className={cat === c ? 'chip active' : 'chip'} onClick={() => setParams({ cat: c })}>
            {LABELS[c]} {count(c)}
          </button>
        ))}
      </div>
      {filtered.length ? (
        <div className="grid">{filtered.map((e) => <Card key={e.name} e={e} />)}</div>
      ) : (
        <p className="empty">没有匹配的仓库，换个关键词试试。</p>
      )}
    </div>
  )
}
