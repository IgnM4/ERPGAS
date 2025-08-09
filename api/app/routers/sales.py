from fastapi import APIRouter, Depends
from sqlmodel import Session
from ..db import get_session
from ..models import Venta, VentaItem, Pago, InventarioMovimiento
from ..schemas import SaleIn

router = APIRouter(prefix="/sales", tags=["sales"])

@router.post("/")
def create_sale(payload: SaleIn, session: Session = Depends(get_session)):
    venta = Venta(tipo_venta=payload.tipo_venta, cliente_id=payload.cliente_id, estado="ENTREGADA")
    session.add(venta)
    subtotal = 0
    for it in payload.items:
        vi = VentaItem(venta=venta, producto_id=it.producto_id, cantidad=it.cantidad, precio_unitario=it.precio_unitario, descuento=it.descuento)
        session.add(vi)
        line_total = (it.precio_unitario * it.cantidad) - it.descuento
        subtotal += line_total
        mov = InventarioMovimiento(producto_id=it.producto_id, tipo="SALIDA", cantidad=it.cantidad, costo_unitario=it.precio_unitario, motivo="Venta", ref="VENTA")
        session.add(mov)
    venta.subtotal = round(subtotal, 2)
    venta.impuestos = round(subtotal * 0.19, 2)
    venta.total = round(venta.subtotal + venta.impuestos, 2)
    for p in payload.pagos:
        pay = Pago(venta_id=venta.id, metodo=p.metodo, monto=p.monto, ref=p.ref)
        session.add(pay)
    session.commit()
    return {"ok": True, "venta_id": venta.id, "total": venta.total}