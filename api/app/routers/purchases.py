from fastapi import APIRouter, Depends
from sqlmodel import Session
from ..db import get_session
from ..models import Compra, CompraItem, InventarioMovimiento
from ..schemas import PurchaseIn

router = APIRouter(prefix="/purchases", tags=["purchases"])

@router.post("/")
def create_purchase(data: PurchaseIn, session: Session = Depends(get_session)):
    compra = Compra(proveedor_id=data.proveedor_id, nro_documento=data.nro_documento, estado="INGRESADA")
    session.add(compra)
    subtotal = 0
    for it in data.items:
        item = CompraItem(compra=compra, producto_id=it.producto_id, cantidad=it.cantidad, costo_unitario=it.costo_unitario)
        session.add(item)
        subtotal += it.cantidad * it.costo_unitario
        mov = InventarioMovimiento(producto_id=it.producto_id, tipo="INGRESO", cantidad=it.cantidad, costo_unitario=it.costo_unitario, motivo="Compra", ref=data.nro_documento)
        session.add(mov)
    compra.subtotal = subtotal
    compra.impuestos = round(subtotal * 0.19, 2)
    compra.total = round(subtotal + compra.impuestos, 2)
    session.commit()
    return {"ok": True, "compra_id": compra.id}