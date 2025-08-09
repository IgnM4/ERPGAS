from fastapi import APIRouter, Depends
from sqlmodel import Session, select
from ..db import get_session
from ..models import Venta, Compra, InventarioMovimiento

router = APIRouter(prefix="/reports", tags=["reports"])

@router.get("/summary")
def summary(session: Session = Depends(get_session)):
    ventas = session.exec(select(Venta)).all()
    compras = session.exec(select(Compra)).all()
    inv = session.exec(select(InventarioMovimiento)).all()
    total_ventas = sum(v.total for v in ventas)
    total_compras = sum(c.total for c in compras)
    movimientos = len(inv)
    return {"total_ventas": total_ventas, "total_compras": total_compras, "movimientos": movimientos}