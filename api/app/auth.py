from fastapi import APIRouter

router = APIRouter(prefix="/auth", tags=["auth"])

@router.post("/login")
def login():
    # Placeholder: en prod usa JWT. Aquí devolvemos API-Key guidance
    return {"info": "Use header x-api-key con el valor configurado en .env"}
