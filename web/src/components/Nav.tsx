import { useState } from 'react'

export default function Nav() {
  const [open, setOpen] = useState(true)
  return (
    <aside className={`h-screen p-4 bg-brand.navy text-white ${open ? 'w-64' : 'w-16'} transition-all`}>
      <button className="mb-4" onClick={() => setOpen(!open)}>≡</button>
      <nav className="flex flex-col gap-2 text-sm">
        <a href="#/" className="hover:underline">Dashboard</a>
        <a href="#/inventory" className="hover:underline">Inventario</a>
        <a href="#/prices" className="hover:underline">Precios</a>
        <a href="#/clients" className="hover:underline">Clientes</a>
        <a href="#/sales" className="hover:underline">Ventas</a>
        <a href="#/purchases" className="hover:underline">Compras</a>
        <a href="#/cash" className="hover:underline">Caja</a>
        <a href="#/settings" className="hover:underline">Settings</a>
      </nav>
    </aside>
  )
}