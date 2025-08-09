from fastapi import APIRouter, Depends
from sqlmodel import Session, select
from ..db import get_session
from ..models import InventarioMovimiento, ProductoCilindro
from ..schemas import InventoryAdjust

router = APIRouter(prefix="/inventory", tags=["inventory"])

@router.get("/movements")
def list_movements(session: Session = Depends(get_session)):
    return session.exec(select(InventarioMovimiento).order_by(InventarioMovimiento.fecha.desc())).all()

@router.post("/adjust")
def adjust_stock(payload: InventoryAdjust, session: Session = Depends(get_session)):
    p = session.get(ProductoCilindro, payload.producto_id)
    assert p, "Producto no existe"
    mov = InventarioMovimiento(**payload.dict())
    # costo_promedio: si es INGRESO, actualiza costo promedio
    if payload.tipo == "INGRESO" and payload.cantidad > 0:
        if p.costo_promedio == 0:
            p.costo_promedio = payload.costo_unitario
        else:
            # promedio simple para MVP
            p.costo_promedio = round((p.costo_promedio + payload.costo_unitario) / 2, 2)
    session.add(mov)
    session.add(p)
    session.commit()
    return {"ok": True}