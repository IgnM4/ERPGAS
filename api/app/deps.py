import os
from fastapi import Header, HTTPException

API_KEY = os.getenv("API_KEY")

async def verify_api_key(x_api_key: str | None = Header(default=None)):
    # En dev, si no hay API_KEY definida, no validamos
    if not API_KEY:
        return
    if x_api_key != API_KEY:
        raise HTTPException(status_code=401, detail="Invalid API Key")
