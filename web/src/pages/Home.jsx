import { Link } from 'react-router-dom'
import Card from '../components/Card.jsx'
import { LABELS, ICONS } from '../data/categories.js'

export default function Home({ data }) {
  const { entries } = data
  const byCat = {}
  for (const e of entries) (byCat[e.category] ??= []).push(e)
  const practiced = entries.filter((e) => e.status === '实践' || e.status === '应用').length
  const recent = [...entries]
    .sort((a, b) => (b.date_added || '').localeCompare(a.date_added || ''))
    .slice(0, 6)

  return (
    <div className="home">
      <section className="hero">
        <h1>代码仓库参照库</h1>
        <p>你收藏过的代码仓库，Claude 帮你分门归类、写清用途。开发新项目前回来翻一翻，找现成的参照和实践对象。</p>
        <Link to="/browse" className="btn">开始浏览 →</Link>
      </section>

      <section className="stats">
        <div className="stat"><b>{entries.length}</b><span>收录仓库</span></div>
        <div className="stat"><b>{Object.keys(byCat).length}</b><span>覆盖分类</span></div>
        <div className="stat"><b>{practiced}</b><span>已实践</span></div>
      </section>

      <section className="cats">
        <h2>按分类浏览</h2>
        <div className="cat-grid">
          {Object.keys(LABELS).filter((c) => byCat[c]).map((c) => {
            const CatIcon = ICONS[c]
            return (
              <Link key={c} to={`/browse?cat=${c}`} className="cat-card">
                <span className="cat-icon"><CatIcon size={22} /></span>
                <div className="cat-info">
                  <b>{LABELS[c]}</b>
                  <span>{byCat[c].length} 个仓库</span>
                </div>
              </Link>
            )
          })}
        </div>
      </section>

      <section className="recent">
        <h2>最近添加</h2>
        {recent.length ? (
          <div className="grid">
            {recent.map((e) => <Card key={e.name} e={e} />)}
          </div>
        ) : (
          <p className="empty">还没有条目。把看到的代码仓库链接发给 Claude 入库吧。</p>
        )}
      </section>
    </div>
  )
}
