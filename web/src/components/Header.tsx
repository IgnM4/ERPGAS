import React from 'react'

export default function Header() {
  const toggleTheme = () => {
    document.documentElement.classList.toggle('dark')
  }
  return (
    <header className="mb-6 rounded-2xl bg-gradient-to-r from-brand.orange to-brand.orangeDark p-4 text-white flex items-center justify-between">
      <h1 className="text-xl font-bold">ERP Gas</h1>
      <button onClick={toggleTheme} className="rounded bg-white/20 px-3 py-1 text-sm hover:bg-white/30 transition">🌓</button>
    </header>
  )
}
