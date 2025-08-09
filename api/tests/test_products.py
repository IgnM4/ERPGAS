import os
import sys
from pathlib import Path
from fastapi.testclient import TestClient

# ensure project root is on sys.path and configure test database
ROOT = Path(__file__).resolve().parents[1]
sys.path.append(str(ROOT))
os.environ["DATABASE_URL"] = "sqlite:///./test.db"

from app.main import app, seed  # noqa: E402
from app.db import init_db  # noqa: E402


def setup_module(module):
    init_db()
    seed()


client = TestClient(app)


def test_list_products_returns_data():
    response = client.get("/products/")
    assert response.status_code == 200
    data = response.json()
    assert isinstance(data, list)
    assert len(data) > 0
