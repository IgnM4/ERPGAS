import { useEffect, useState } from 'react'
import { api } from '../lib/api'

export default function Inventory(){
  const [products, setProducts] = useState<any[]>([])
  const [movs, setMovs] = useState<any[]>([])
  useEffect(() => {
    api('/products/').then(setProducts)
    api('/inventory/movements').then(setMovs)
  }, [])
  return (
    <div className="grid gap-6">
      <section>
        <h2 className="font-semibold mb-2">Productos</h2>
        <table className="w-full text-sm">
          <thead><tr><th className="text-left">Formato</th><th>Código</th><th>Precio</th><th>Min</th></tr></thead>
          <tbody>
            {products.map(p => (
              <tr key={p.id} className="border-b"><td>{p.formato}</td><td className="text-center">{p.codigo}</td><td className="text-right">{p.precio_lista}</td><td className="text-center">{p.stock_minimo}</td></tr>
            ))}
          </tbody>
        </table>
      </section>
      <section>
        <h2 className="font-semibold mb-2">Movimientos recientes</h2>
        <ul className="text-sm">
          {movs.map((m,i) => <li key={i}>{m.fecha} — {m.tipo} x{m.cantidad} (prod {m.producto_id}) — {m.motivo}</li>)}
        </ul>
      </section>
    </div>
  )
}