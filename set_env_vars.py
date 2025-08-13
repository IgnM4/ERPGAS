import os
import subprocess

# Variables de entorno
env_vars = {
    "POSTGRES_DB": "erp_user",
    "POSTGRES_USER": "erp_user",
    "POSTGRES_PASSWORD": "erp_pass",
    "POSTGRES_HOST": "db",
    "POSTGRES_PORT": "5432",
    "DATABASE_URL": "postgresql+psycopg://erp_user:erp_pass@db:5432/erp_user"
}

def set_env_var(name, value):
    """
    Configura una variable de entorno en Windows de forma persistente usando 'setx'.
    """
    try:
        subprocess.run(["setx", name, value], check=True, shell=True)
        print(f"[OK] {name} configurada correctamente.")
    except subprocess.CalledProcessError as e:
        print(f"[ERROR] No se pudo configurar {name}: {e}")

if __name__ == "__main__":
    print("=== Configurando variables de entorno para Postgres ===")
    for key, val in env_vars.items():
        set_env_var(key, val)

    print("\n⚠️ Nota: Cierra y vuelve a abrir la terminal para que los cambios surtan efecto.")
