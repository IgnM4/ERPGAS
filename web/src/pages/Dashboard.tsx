import { useEffect, useState } from 'react'
import { api } from '../lib/api'
import Card from '../components/Card'

export default function Dashboard() {
  const [data, setData] = useState<any>({})
  const [recent, setRecent] = useState<any[]>([])

  useEffect(() => {
    api('/reports/summary').then(setData).catch(console.error)
    api('/activity/recent').then(setRecent).catch(() => setRecent([]))
  }, [])

  return (
    <div className="grid gap-6">
      <div className="grid md:grid-cols-3 gap-4">
        <Card title="Ventas (CLP)" value={data.total_ventas ?? 0} />
        <Card title="Compras (CLP)" value={data.total_compras ?? 0} />
        <Card title="Mov. Inventario" value={data.movimientos ?? 0} />
      </div>

      <section className="grid md:grid-cols-2 gap-4">
        <div>
          <h2 className="font-semibold mb-2">Reportes</h2>
          <ul className="text-sm list-disc pl-5">
            <li><a href="#/sales" className="text-blue-600 underline">Ventas</a></li>
            <li><a href="#/purchases" className="text-blue-600 underline">Compras</a></li>
          </ul>
        </div>
        <div>
          <h2 className="font-semibold mb-2">Actividades recientes</h2>
          <ul className="text-sm space-y-1">
            {recent.length === 0 && <li>No hay actividades recientes</li>}
            {recent.map((r, i) => (
              <li key={i}>{r.descripcion || JSON.stringify(r)}</li>
            ))}
          </ul>
        </div>
      </section>
    </div>
  )
}