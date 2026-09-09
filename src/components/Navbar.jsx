import { useState } from 'react'
import { NavLink } from 'react-router-dom'

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  const closeMenu = () => {
    setIsMenuOpen(false)
  }

  const navItems = [
    { name: 'About', path: '/about' },
    { name: 'Projects', path: '/projects' },
    { name: 'Contact', path: '/contact' },
  ]

  return (
    <header className="header">
      <NavLink
        to="/"
        onClick={closeMenu}
        aria-label="Go to home"
        className="w-10 h-10 rounded-lg bg-white items-center justify-center flex font-bold shadow-md transition-all duration-200 hover:scale-105 hover:shadow-lg active:scale-95"
      >
        <p className="blue-gradient_text">NN</p>
      </NavLink>

      <nav className="hidden sm:flex items-center text-lg gap-7 font-medium">
        {navItems.map((item) => (
          <NavLink
            key={item.name}
            to={item.path}
            className={({ isActive }) =>
              `transition-colors duration-200 ${
                isActive
                  ? 'text-blue-500'
                  : 'text-black hover:text-blue-400'
              }`
            }
          >
            {item.name}
          </NavLink>
        ))}
      </nav>

      <div className="sm:hidden relative">
        <button
          type="button"
          aria-label={
            isMenuOpen
              ? 'Close navigation menu'
              : 'Open navigation menu'
          }
          aria-expanded={isMenuOpen}
          onClick={() => setIsMenuOpen((prev) => !prev)}
          className="w-10 h-10 rounded-lg bg-white flex items-center justify-center shadow-md transition-transform duration-200 active:scale-95"
        >
          <div className="flex flex-col items-center justify-center gap-1.5">
            <span
              className={`block w-5 h-0.5 bg-slate-700 rounded-full transition-all duration-300 ${
                isMenuOpen
                  ? 'translate-y-2 rotate-45'
                  : ''
              }`}
            />

            <span
              className={`block w-5 h-0.5 bg-slate-700 rounded-full transition-all duration-200 ${
                isMenuOpen
                  ? 'opacity-0'
                  : 'opacity-100'
              }`}
            />

            <span
              className={`block w-5 h-0.5 bg-slate-700 rounded-full transition-all duration-300 ${
                isMenuOpen
                  ? '-translate-y-2 -rotate-45'
                  : ''
              }`}
            />
          </div>
        </button>

        <div
          className={`absolute top-12 right-0 w-44 mt-2 p-2 rounded-xl bg-white border border-slate-100 shadow-lg z-50 origin-top-right transition-all duration-300 ease-out ${
            isMenuOpen
              ? 'opacity-100 translate-y-0 scale-100 pointer-events-auto'
              : 'opacity-0 -translate-y-2 scale-95 pointer-events-none'
          }`}
        >
          <nav className="flex flex-col gap-1">
            {navItems.map((item) => (
              <NavLink
                key={item.name}
                to={item.path}
                onClick={closeMenu}
                className={({ isActive }) =>
                  `px-4 py-3 rounded-lg text-sm font-medium transition-all duration-200 ${
                    isActive
                      ? 'text-blue-500 bg-blue-50'
                      : 'text-slate-700 hover:bg-slate-50 hover:text-blue-400'
                  }`
                }
              >
                {item.name}
              </NavLink>
            ))}
          </nav>
        </div>
      </div>
    </header>
  )
}

export default Navbar