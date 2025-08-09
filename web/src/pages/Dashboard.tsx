import { useEffect, useState } from 'react'
import { api } from '../lib/api'
import Card from '../components/Card'

export default function Dashboard(){
  const [data, setData] = useState<any>({})
  useEffect(() => {
    api('/reports/summary').then(setData).catch(console.error)
  }, [])
  return (
    <div className="grid md:grid-cols-3 gap-4">
      <Card title="Ventas (CLP)" value={data.total_ventas ?? 0} />
      <Card title="Compras (CLP)" value={data.total_compras ?? 0} />
      <Card title="Mov. Inventario" value={data.movimientos ?? 0} />
    </div>
  )
}