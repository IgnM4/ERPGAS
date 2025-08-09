from __future__ import annotations
from typing import Optional
from sqlmodel import SQLModel, Field
from datetime import datetime

class ProductoCilindro(SQLModel, table=True):
    id: Optional[int] = Field(default=None, primary_key=True)
    formato: str
    codigo: str
    activo: bool = True
    precio_lista: float
    costo_promedio: float
    unidad: str = "cilindro"
    impuesto: float = 0.0
    stock_minimo: int = 0


class PrecioHistorial(SQLModel, table=True):
    id: Optional[int] = Field(default=None, primary_key=True)
    producto_id: int = Field(foreign_key="productocilindro.id")
    precio_anterior: float
    precio_nuevo: float
    motivo: str
    fecha: datetime = Field(default_factory=datetime.utcnow)
    usuario: str = "system"


class InventarioMovimiento(SQLModel, table=True):
    id: Optional[int] = Field(default=None, primary_key=True)
    producto_id: int = Field(foreign_key="productocilindro.id")
    tipo: str  # INGRESO | SALIDA | AJUSTE
    cantidad: int
    costo_unitario: float
    motivo: str
    ref: Optional[str] = None
    fecha: datetime = Field(default_factory=datetime.utcnow)
    usuario: str = "system"

class Proveedor(SQLModel, table=True):
    id: Optional[int] = Field(default=None, primary_key=True)
    nombre: str
    rut: Optional[str] = None
    contacto: Optional[str] = None
    telefono: Optional[str] = None
    email: Optional[str] = None

class Compra(SQLModel, table=True):
    id: Optional[int] = Field(default=None, primary_key=True)
    proveedor_id: int = Field(foreign_key="proveedor.id")
    nro_documento: str
    fecha: datetime = Field(default_factory=datetime.utcnow)
    estado: str = "INGRESADA"  # PENDIENTE | INGRESADA | ANULADA
    subtotal: float = 0
    impuestos: float = 0
    total: float = 0

class CompraItem(SQLModel, table=True):
    id: Optional[int] = Field(default=None, primary_key=True)
    compra_id: int = Field(foreign_key="compra.id")
    producto_id: int = Field(foreign_key="productocilindro.id")
    cantidad: int
    costo_unitario: float

class Cliente(SQLModel, table=True):
    id: Optional[int] = Field(default=None, primary_key=True)
    nombre: str
    rut: Optional[str] = None
    telefono: Optional[str] = None
    direccion: Optional[str] = None
    comuna: Optional[str] = None
    lat: Optional[float] = None
    lng: Optional[float] = None
    notas: Optional[str] = None
    activo: bool = True

class Venta(SQLModel, table=True):
    id: Optional[int] = Field(default=None, primary_key=True)
    fecha: datetime = Field(default_factory=datetime.utcnow)
    tipo_venta: str  # DOMICILIO | LOCAL
    cliente_id: Optional[int] = Field(default=None, foreign_key="cliente.id")
    estado: str = "ENTREGADA"  # PENDIENTE | ENTREGADA | ANULADA
    subtotal: float = 0
    impuestos: float = 0
    total: float = 0

class VentaItem(SQLModel, table=True):
    id: Optional[int] = Field(default=None, primary_key=True)
    venta_id: int = Field(foreign_key="venta.id")
    producto_id: int = Field(foreign_key="productocilindro.id")
    cantidad: int
    precio_unitario: float
    descuento: float = 0

class Pago(SQLModel, table=True):
    id: Optional[int] = Field(default=None, primary_key=True)
    venta_id: int = Field(foreign_key="venta.id")
    metodo: str  # EFECTIVO | DEBITO | CREDITO | TRANSFERENCIA | OTRO
    monto: float
    fecha: datetime = Field(default_factory=datetime.utcnow)
    ref: Optional[str] = None

class Caja(SQLModel, table=True):
    id: Optional[int] = Field(default=None, primary_key=True)
    fecha_apertura: datetime = Field(default_factory=datetime.utcnow)
    usuario_apertura: str = "system"
    saldo_inicial: float = 0
    fecha_cierre: Optional[datetime] = None
    usuario_cierre: Optional[str] = None
    saldo_final: Optional[float] = None
    estado: str = "ABIERTA"  # ABIERTA | CERRADA

class MovimientoCaja(SQLModel, table=True):
    id: Optional[int] = Field(default=None, primary_key=True)
    caja_id: int = Field(foreign_key="caja.id")
    tipo: str  # INGRESO | EGRESO
    origen: str  # VENTA | AJUSTE | OTRO
    monto: float
    descripcion: str
    fecha: datetime = Field(default_factory=datetime.utcnow)
    usuario: str = "system"
