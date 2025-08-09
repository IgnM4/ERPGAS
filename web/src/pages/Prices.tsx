import { useEffect, useState } from 'react'
import { api } from '../lib/api'

export default function Prices(){
  const [products, setProducts] = useState<any[]>([])
  const [history, setHistory] = useState<any[]>([])
  const [form, setForm] = useState<any>({ producto_id: '', precio_nuevo: '', motivo:'ajuste' })
  const load = () => { api('/products/').then(setProducts); api('/prices/history').then(setHistory) }
  useEffect(() => { load() }, [])
  return (
    <div className="grid gap-4">
      <form className="flex gap-2 items-center" onSubmit={async e=>{e.preventDefault(); await api('/products/price', { method:'POST', body: JSON.stringify({ ...form, producto_id: Number(form.producto_id), precio_nuevo: Number(form.precio_nuevo) }) }); setForm({ producto_id:'', precio_nuevo:'', motivo:'ajuste'}); load(); }}>
        <select className="border p-2" value={form.producto_id} onChange={e=>setForm({...form, producto_id:e.target.value})}>
          <option value="">Producto</option>
          {products.map(p => <option key={p.id} value={p.id}>{p.formato} ({p.codigo})</option>)}
        </select>
        <input className="border p-2" placeholder="Precio nuevo" value={form.precio_nuevo} onChange={e=>setForm({...form, precio_nuevo:e.target.value})} />
        <input className="border p-2" placeholder="Motivo" value={form.motivo} onChange={e=>setForm({...form, motivo:e.target.value})} />
        <button className="bg-brand.orange text-black font-semibold px-4 py-2 rounded">Cambiar</button>
      </form>
      <ul className="text-sm">
        {history.map((h,i)=> <li key={i}>{h.fecha} — Prod {h.producto_id} de {h.precio_anterior} a {h.precio_nuevo} ({h.motivo})</li>)}
      </ul>
    </div>
  )
}