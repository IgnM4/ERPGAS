from typing import List, Optional
from pydantic import BaseModel

class ProductCreate(BaseModel):
    formato: str
    codigo: str
    precio_lista: float
    costo_promedio: float = 0
    impuesto: float = 0
    stock_minimo: int = 0
    activo: bool = True

class ProductRead(ProductCreate):
    id: int

class ClientCreate(BaseModel):
    nombre: str
    rut: Optional[str] = None
    telefono: Optional[str] = None
    direccion: Optional[str] = None
    comuna: Optional[str] = None
    lat: Optional[float] = None
    lng: Optional[float] = None
    notas: Optional[str] = None
    activo: bool = True

class ClientRead(ClientCreate):
    id: int

class PriceChange(BaseModel):
    producto_id: int
    precio_nuevo: float
    motivo: str = "ajuste"

class InventoryAdjust(BaseModel):
    producto_id: int
    tipo: str
    cantidad: int
    costo_unitario: float = 0
    motivo: str
    ref: Optional[str] = None

class PurchaseItemIn(BaseModel):
    producto_id: int
    cantidad: int
    costo_unitario: float

class PurchaseIn(BaseModel):
    proveedor_id: int
    nro_documento: str
    items: List[PurchaseItemIn]

class SaleItemIn(BaseModel):
    producto_id: int
    cantidad: int
    precio_unitario: float
    descuento: float = 0

class PaymentIn(BaseModel):
    metodo: str
    monto: float
    ref: Optional[str] = None

class SaleIn(BaseModel):
    tipo_venta: str
    cliente_id: Optional[int] = None
    items: List[SaleItemIn]
    pagos: List[PaymentIn] = []