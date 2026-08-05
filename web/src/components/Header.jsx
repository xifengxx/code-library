import { Link, NavLink } from 'react-router-dom'

export default function Header({ count }) {
  return (
    <header className="header">
      <Link to="/" className="brand">📚 <span>Code Library</span></Link>
      <nav className="nav">
        <NavLink to="/" end className={({ isActive }) => (isActive ? 'nav-item active' : 'nav-item')}>首页</NavLink>
        <NavLink to="/browse" className={({ isActive }) => (isActive ? 'nav-item active' : 'nav-item')}>浏览 · {count}</NavLink>
      </nav>
    </header>
  )
}
