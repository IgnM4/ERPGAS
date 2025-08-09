import { useEffect, useState } from 'react'
import { api } from '../lib/api'

export default function Purchases(){
  const [items, setItems] = useState<any[]>([])
  const addItem = ()=> setItems([...items, { producto_id:'', cantidad:1, costo_unitario:0 }])
  return (
    <div className="grid gap-4">
      <button className="bg-brand.orange px-3 py-2 rounded" onClick={addItem}>+ Ítem</button>
      {items.map((it:any, idx:number)=> (
        <div key={idx} className="grid md:grid-cols-3 gap-2">
          <input className="border p-2" placeholder="Producto ID" value={it.producto_id} onChange={e=>{const v=[...items]; v[idx].producto_id=Number(e.target.value); setItems(v)}} />
          <input className="border p-2" type="number" placeholder="Cantidad" value={it.cantidad} onChange={e=>{const v=[...items]; v[idx].cantidad=Number(e.target.value); setItems(v)}} />
          <input className="border p-2" type="number" placeholder="Costo unitario" value={it.costo_unitario} onChange={e=>{const v=[...items]; v[idx].costo_unitario=Number(e.target.value); setItems(v)}} />
        </div>
      ))}
      <button className="bg-brand.orange text-black font-semibold px-4 py-2 rounded" onClick={async()=>{
        await api('/purchases/', { method:'POST', body: JSON.stringify({ proveedor_id:1, nro_documento: 'FAC-001', items }) })
        alert('Compra ingresada')
        location.reload()
      }}>Registrar Compra</button>
    </div>
  )
}