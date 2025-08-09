from fastapi import APIRouter, Depends
from sqlmodel import Session, select
from ..db import get_session
from ..models import Cliente
from ..schemas import ClientCreate, ClientRead

router = APIRouter(prefix="/clients", tags=["clients"])

@router.get("/", response_model=list[ClientRead])
def list_clients(session: Session = Depends(get_session)):
    return session.exec(select(Cliente)).all()

@router.post("/", response_model=ClientRead)
def create_client(data: ClientCreate, session: Session = Depends(get_session)):
    c = Cliente(**data.dict())
    session.add(c)
    session.commit()
    session.refresh(c)
    return c