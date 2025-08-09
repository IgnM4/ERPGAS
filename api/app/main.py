import os
from fastapi import FastAPI, Depends
from fastapi.middleware.cors import CORSMiddleware
from sqlmodel import Session
from .db import init_db, get_session
from .models import ProductoCilindro, Proveedor, Cliente, Caja, PrecioHistorial
from .routers import products, clients, prices, inventory, purchases, sales, cashbox, reports
from .deps import verify_api_key
from .auth import router as auth_router

app = FastAPI(title="ERP Gas API", version="1.0.0")

origins = [os.getenv("ALLOWED_ORIGINS", "http://localhost:5173")]
app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Aplica API Key si está configurada
def deps_chain():
    return [verify_api_key]

app.include_router(auth_router, dependencies=deps_chain())
app.include_router(products.router, dependencies=deps_chain())
app.include_router(clients.router, dependencies=deps_chain())
app.include_router(prices.router, dependencies=deps_chain())
app.include_router(inventory.router, dependencies=deps_chain())
app.include_router(purchases.router, dependencies=deps_chain())
app.include_router(sales.router, dependencies=deps_chain())
app.include_router(cashbox.router, dependencies=deps_chain())
app.include_router(reports.router, dependencies=deps_chain())

@app.on_event("startup")
def on_startup():
    init_db()
    seed()


def seed():
    from .db import engine
    from sqlmodel import Session
    with Session(engine) as session:
        if not session.query(ProductoCilindro).first():
            formatos = [
                ("5kg", "CIL-5KG", 12000.0, 6000.0, 20),
                ("11kg", "CIL-11KG", 20000.0, 11000.0, 40),
                ("15kg", "CIL-15KG", 26000.0, 15000.0, 20),
                ("45kg", "CIL-45KG", 68000.0, 50000.0, 10),
                ("VMA", "CIL-VMA", 0.0, 0.0, 0),
                ("VMF", "CIL-VMF", 0.0, 0.0, 0),
            ]
            for f,cod,pl,cp,sm in formatos:
                p = ProductoCilindro(formato=f, codigo=cod, precio_lista=pl, costo_promedio=cp, stock_minimo=sm)
                session.add(p)
                session.flush()  # asegura p.id
                session.add(PrecioHistorial(producto_id=p.id, precio_anterior=pl, precio_nuevo=pl, motivo="init"))
            session.add(Proveedor(nombre="Abastible S.A.", rut="76.543.210-1"))
            session.add(Cliente(nombre="Cliente Local", telefono="+56 9", direccion="Curicó", comuna="Curicó", lat=-34.98, lng=-71.24))
            session.add(Caja(saldo_inicial=0))
            session.commit()