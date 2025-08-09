import { useEffect, useState } from 'react'
import { api } from '../lib/api'

export default function Clients(){
  const [clients, setClients] = useState<any[]>([])
  const [form, setForm] = useState<any>({ nombre: '', telefono: '' })
  const load = () => api('/clients/').then(setClients)
  useEffect(() => { load() }, [])
  return (
    <div className="grid gap-4">
      <form className="grid gap-2 md:grid-cols-3" onSubmit={async e=>{e.preventDefault(); await api('/clients/', {method:'POST', body: JSON.stringify(form)}); setForm({nombre:'', telefono:''}); load();}}>
        <input className="border p-2" placeholder="Nombre" value={form.nombre} onChange={e=>setForm({...form, nombre:e.target.value})} />
        <input className="border p-2" placeholder="Teléfono" value={form.telefono||''} onChange={e=>setForm({...form, telefono:e.target.value})} />
        <input className="border p-2" placeholder="Dirección" value={form.direccion||''} onChange={e=>setForm({...form, direccion:e.target.value})} />
        <input className="border p-2" placeholder="Comuna" value={form.comuna||''} onChange={e=>setForm({...form, comuna:e.target.value})} />
        <input className="border p-2" placeholder="Lat" value={form.lat||''} onChange={e=>setForm({...form, lat:e.target.value})} />
        <input className="border p-2" placeholder="Lng" value={form.lng||''} onChange={e=>setForm({...form, lng:e.target.value})} />
        <button className="bg-brand.orange text-black font-semibold px-4 py-2 rounded">Agregar</button>
      </form>
      <table className="w-full text-sm">
        <thead><tr><th>Nombre</th><th>Teléfono</th><th>Dirección</th><th>Mapa</th></tr></thead>
        <tbody>
          {clients.map(c => (
            <tr key={c.id} className="border-b">
              <td>{c.nombre}</td>
              <td>{c.telefono||''}</td>
              <td>{c.direccion||''}</td>
              <td>
                {c.lat && c.lng ? (
                  <a className="text-blue-600 underline" target="_blank" href={`https://www.google.com/maps?q=${c.lat},${c.lng}`}>Ver en Maps</a>
                ) : c.direccion ? (
                  <a className="text-blue-600 underline" target="_blank" href={`https://www.google.com/maps/search/${encodeURIComponent(c.direccion)}`}>Buscar</a>
                ) : '-' }
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}