import { Routes, Route } from 'react-router-dom'
import Header from './components/Header.jsx'
import Home from './pages/Home.jsx'
import Browse from './pages/Browse.jsx'
import Detail from './pages/Detail.jsx'
import data from './data/repos.json'

export default function App() {
  return (
    <div className="app">
      <Header count={data.entries.length} />
      <main className="content">
        <Routes>
          <Route path="/" element={<Home data={data} />} />
          <Route path="/browse" element={<Browse data={data} />} />
          <Route path="/repo/:name" element={<Detail data={data} />} />
          <Route path="*" element={<Home data={data} />} />
        </Routes>
      </main>
      <footer className="footer">
        Code Library · 个人代码仓库参照库
        <span className="footer-hint">数据源 <code>repos/</code> · 入库后运行 <code>node scripts/build-index.mjs</code> 刷新</span>
      </footer>
    </div>
  )
}
