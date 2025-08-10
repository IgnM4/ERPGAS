import { useEffect, useState } from 'react'
import { api } from '../lib/api'

export default function Inventory() {
  const [products, setProducts] = useState<any[]>([])
  const [movs, setMovs] = useState<any[]>([])
  const [tab, setTab] = useState<'productos' | 'categorias' | 'movimientos'>('productos')
  const [query, setQuery] = useState('')

  useEffect(() => {
    api('/products/').then(setProducts)
    api('/inventory/movements').then(setMovs)
  }, [])

  const filtered = products.filter(p =>
    p.formato.toLowerCase().includes(query.toLowerCase()) ||
    p.codigo.toLowerCase().includes(query.toLowerCase())
  )

  return (
    <div className="grid gap-6">
      <div className="flex gap-2 mb-4">
        <button
          onClick={() => setTab('productos')}
          className={`px-3 py-1 rounded ${tab === 'productos' ? 'bg-brand.orange text-black' : 'bg-slate-200 dark:bg-slate-700'}`}
        >
          Productos
        </button>
        <button
          onClick={() => setTab('categorias')}
          className={`px-3 py-1 rounded ${tab === 'categorias' ? 'bg-brand.orange text-black' : 'bg-slate-200 dark:bg-slate-700'}`}
        >
          Categorías
        </button>
        <button
          onClick={() => setTab('movimientos')}
          className={`px-3 py-1 rounded ${tab === 'movimientos' ? 'bg-brand.orange text-black' : 'bg-slate-200 dark:bg-slate-700'}`}
        >
          Movimientos
        </button>
      </div>

      {tab === 'productos' && (
        <section className="space-y-4">
          <div className="flex items-center justify-between">
            <input
              className="border p-2 flex-1 mr-2"
              placeholder="Buscar producto"
              value={query}
              onChange={e => setQuery(e.target.value)}
            />
            <button className="bg-brand.orange text-black font-semibold px-4 py-2 rounded">Agregar</button>
          </div>
          <table className="w-full text-sm">
            <thead>
              <tr>
                <th className="text-left">Foto</th>
                <th className="text-left">Formato</th>
                <th>Código</th>
                <th>Precio</th>
                <th>Estado</th>
                <th>Min</th>
                <th>Acciones</th>
              </tr>
            </thead>
            <tbody>
              {filtered.map(p => (
                <tr key={p.id} className="border-b">
                  <td className="py-1"><img src={p.foto || 'https://via.placeholder.com/40'} alt="foto" className="w-10 h-10 object-cover" /></td>
                  <td>{p.formato}</td>
                  <td className="text-center">{p.codigo}</td>
                  <td className="text-right">{p.precio_lista}</td>
                  <td className="text-center">{p.activo ? 'Activo' : 'Inactivo'}</td>
                  <td className="text-center">{p.stock_minimo}</td>
                  <td className="text-center">
                    <div className="flex justify-center gap-2">
                      <button className="text-blue-600 text-xs">Editar</button>
                      <button className="text-red-600 text-xs">Eliminar</button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </section>
      )}

      {tab === 'categorias' && (
        <section className="text-sm">
          <p>Gestión de categorías de productos próximamente.</p>
        </section>
      )}

      {tab === 'movimientos' && (
        <section>
          <h2 className="font-semibold mb-2">Movimientos recientes</h2>
          <ul className="text-sm">
            {movs.map((m, i) => (
              <li key={i}>
                {m.fecha} — {m.tipo} x{m.cantidad} (prod {m.producto_id}) — {m.motivo}
              </li>
            ))}
          </ul>
        </section>
      )}
    </div>
  )
}