from fastapi import APIRouter, Depends
from sqlmodel import Session, select
from ..db import get_session
from ..models import ProductoCilindro, PrecioHistorial
from ..schemas import ProductCreate, ProductRead, PriceChange

router = APIRouter(prefix="/products", tags=["products"])

@router.get("/", response_model=list[ProductRead])
def list_products(session: Session = Depends(get_session)):
    return session.exec(select(ProductoCilindro)).all()

@router.post("/", response_model=ProductRead)
def create_product(data: ProductCreate, session: Session = Depends(get_session)):
    p = ProductoCilindro(**data.dict())
    session.add(p)
    session.commit()
    session.refresh(p)
    return p

@router.post("/price", response_model=dict)
def change_price(payload: PriceChange, session: Session = Depends(get_session)):
    p = session.get(ProductoCilindro, payload.producto_id)
    assert p, "Producto no existe"
    hist = PrecioHistorial(
        producto_id=p.id,
        precio_anterior=p.precio_lista,
        precio_nuevo=payload.precio_nuevo,
        motivo=payload.motivo,
    )
    p.precio_lista = payload.precio_nuevo
    session.add(hist)
    session.add(p)
    session.commit()
    return {"ok": True}
