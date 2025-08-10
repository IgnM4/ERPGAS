from sqlmodel import SQLModel, create_engine, Session
import os

# Use SQLite by default for easier local development. If ``DATABASE_URL`` is
# provided in the environment, it will override this value (for example to use
# PostgreSQL in production).
DATABASE_URL = os.getenv("DATABASE_URL", "sqlite:///./erp_gas.db")
connect_args = {"check_same_thread": False} if DATABASE_URL.startswith("sqlite") else {}
engine = create_engine(DATABASE_URL, echo=False, connect_args=connect_args)

def init_db():
    SQLModel.metadata.create_all(engine)


def get_session():
    with Session(engine) as session:
        yield session
