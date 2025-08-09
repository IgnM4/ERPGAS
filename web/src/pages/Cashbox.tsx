import { api } from '../lib/api'

export default function Cashbox(){
  return (
    <div className="flex gap-2">
      <button className="bg-brand.orange px-3 py-2 rounded" onClick={async()=>{ await api('/cash/open', { method:'POST' }); alert('Caja abierta')}}>Abrir Caja</button>
      <button className="bg-brand.orange px-3 py-2 rounded" onClick={async()=>{ await api('/cash/close', { method:'POST' }); alert('Caja cerrada')}}>Cerrar Caja</button>
      <button className="bg-brand.orange px-3 py-2 rounded" onClick={async()=>{ const r = await api('/cash/status'); alert(JSON.stringify(r))}}>Estado</button>
    </div>
  )
}