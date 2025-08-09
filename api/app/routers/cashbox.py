from fastapi import APIRouter, Depends, HTTPException
from sqlmodel import Session, select
from ..db import get_session
from ..models import Caja, MovimientoCaja, Pago

router = APIRouter(prefix="/cash", tags=["cash"])

@router.post("/open")
def open_cash(session: Session = Depends(get_session)):
    open_exists = session.exec(select(Caja).where(Caja.estado == "ABIERTA")).first()
    if open_exists:
        return {"info": "Ya hay caja abierta"}
    caja = Caja(saldo_inicial=0)
    session.add(caja)
    session.commit()
    return {"ok": True, "caja_id": caja.id}

@router.post("/close")
def close_cash(session: Session = Depends(get_session)):
    caja = session.exec(select(Caja).where(Caja.estado == "ABIERTA")).first()
    if not caja:
        raise HTTPException(400, "No hay caja abierta")
    caja.estado = "CERRADA"
    caja.saldo_final = caja.saldo_inicial + _sum_mov(session, caja.id)
    session.add(caja)
    session.commit()
    return {"ok": True}

@router.get("/status")
def status(session: Session = Depends(get_session)):
    caja = session.exec(select(Caja).where(Caja.estado == "ABIERTA")).first()
    return {"abierta": bool(caja)}

@router.post("/move")
def move(tipo: str, origen: str, monto: float, descripcion: str, session: Session = Depends(get_session)):
    caja = session.exec(select(Caja).where(Caja.estado == "ABIERTA")).first()
    if not caja:
        raise HTTPException(400, "Abra caja primero")
    mov = MovimientoCaja(caja_id=caja.id, tipo=tipo, origen=origen, monto=monto, descripcion=descripcion)
    session.add(mov)
    session.commit()
    return {"ok": True}

def _sum_mov(session: Session, caja_id: int) -> float:
    movimientos = session.exec(select(MovimientoCaja).where(MovimientoCaja.caja_id == caja_id)).all()
    total = 0.0
    for m in movimientos:
        total += m.monto if m.tipo == "INGRESO" else -m.monto
    return total