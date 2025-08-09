from fastapi import APIRouter, Depends
from sqlmodel import Session, select
from ..db import get_session
from ..models import PrecioHistorial

router = APIRouter(prefix="/prices", tags=["prices"])

@router.get("/history")
def history(session: Session = Depends(get_session)):
    return session.exec(select(PrecioHistorial)).all()