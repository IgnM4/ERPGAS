import { useEffect, useState } from 'react'
import { api } from '../lib/api'

export default function Sales(){
  const [products, setProducts] = useState<any[]>([])
  const [form, setForm] = useState<any>({ tipo_venta:'LOCAL', items:[], pagos:[] })
  useEffect(()=>{ api('/products/').then(setProducts) },[])
  const addItem = ()=> setForm({...form, items:[...form.items, { producto_id:'', cantidad:1, precio_unitario:0, descuento:0 }]})
  const addPago = ()=> setForm({...form, pagos:[...form.pagos, { metodo:'EFECTIVO', monto:0 }]})
  return (
    <div className="grid gap-4">
      <div className="flex gap-2 items-center">
        <select className="border p-2" value={form.tipo_venta} onChange={e=>setForm({...form, tipo_venta:e.target.value})}>
          <option>LOCAL</option>
          <option>DOMICILIO</option>
        </select>
        <button onClick={addItem} className="bg-brand.orange px-3 py-2 rounded">+ Ítem</button>
        <button onClick={addPago} className="bg-brand.orange px-3 py-2 rounded">+ Pago</button>
      </div>
      <div className="grid gap-2">
        {form.items.map((it:any, idx:number)=> (
          <div key={idx} className="grid md:grid-cols-4 gap-2">
            <select className="border p-2" value={it.producto_id} onChange={e=>{const v=[...form.items]; v[idx].producto_id=Number(e.target.value); setForm({...form, items:v})}}>
              <option value="">Producto</option>
              {products.map(p => <option key={p.id} value={p.id}>{p.formato}</option>)}
            </select>
            <input className="border p-2" type="number" placeholder="Cantidad" value={it.cantidad} onChange={e=>{const v=[...form.items]; v[idx].cantidad=Number(e.target.value); setForm({...form, items:v})}} />
            <input className="border p-2" type="number" placeholder="Precio unitario" value={it.precio_unitario} onChange={e=>{const v=[...form.items]; v[idx].precio_unitario=Number(e.target.value); setForm({...form, items:v})}} />
            <input className="border p-2" type="number" placeholder="Descuento" value={it.descuento||0} onChange={e=>{const v=[...form.items]; v[idx].descuento=Number(e.target.value); setForm({...form, items:v})}} />
          </div>
        ))}
      </div>
      <div className="grid gap-2">
        {form.pagos.map((p:any, idx:number)=> (
          <div key={idx} className="grid md:grid-cols-3 gap-2">
            <select className="border p-2" value={p.metodo} onChange={e=>{const v=[...form.pagos]; v[idx].metodo=e.target.value; setForm({...form, pagos:v})}}>
              <option>EFECTIVO</option>
              <option>DEBITO</option>
              <option>CREDITO</option>
              <option>TRANSFERENCIA</option>
              <option>OTRO</option>
            </select>
            <input className="border p-2" type="number" placeholder="Monto" value={p.monto} onChange={e=>{const v=[...form.pagos]; v[idx].monto=Number(e.target.value); setForm({...form, pagos:v})}} />
            <input className="border p-2" placeholder="Ref" value={p.ref||''} onChange={e=>{const v=[...form.pagos]; v[idx].ref=e.target.value; setForm({...form, pagos:v})}} />
          </div>
        ))}
      </div>
      <button className="bg-brand.orange text-black font-semibold px-4 py-2 rounded" onClick={async()=>{
        await api('/sales/', { method:'POST', body: JSON.stringify({ ...form, cliente_id: null }) })
        alert('Venta registrada')
        location.reload()
      }}>Registrar Venta</button>
    </div>
  )
}