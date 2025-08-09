# ERP Gas — FastAPI + React

### Requisitos
- Docker y Docker Compose instalados.

### Pasos rápidos
1) Clona o copia este repo y crea el archivo `.env` en la raíz (usa el ejemplo del proyecto).
2) Ejecuta:
```bash
docker compose up --build
```

### Despliegue en Firebase Hosting
1) Instala la CLI de Firebase si aún no la tienes:
```bash
npm install -g firebase-tools
```
2) Construye la aplicación web:
```bash
cd web
npm run build
```
3) Autentícate e implementa en Firebase:
```bash
firebase login
firebase deploy
```
La configuración de Firebase se encuentra en `firebase.json` y `.firebaserc`.

### Pruebas y CI
Las pruebas unitarias se ejecutan con `pytest`:

```bash
cd api
pytest
```

Un flujo de trabajo de GitHub Actions (`.github/workflows/tests.yml`) ejecuta estas pruebas en cada *push* o *pull request*.

### Logging
La API utiliza logging estructurado basado en la configuración estándar de Python, controlado por la variable de entorno `LOG_LEVEL`.