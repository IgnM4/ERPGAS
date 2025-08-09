# ERP Gas — Firebase + React

### Requisitos
- Docker y Docker Compose instalados.

### Pasos rápidos
1) Clona o copia este repo y crea el archivo `.env` en la raíz (usa el ejemplo del proyecto).
2) Ejecuta:
```bash
docker compose up --build
```

### Entorno local con Firebase
1) Instala dependencias y crea tu `.env` basado en `.env.example`.
2) Inicia la app web y funciones en modo desarrollo:
```bash
npm run dev:web
npm run dev:functions
```
3) Arranca los emuladores de Firebase (Auth, Firestore, Functions, Hosting):
```bash
npm run firebase:emulators
```

### Despliegue en Firebase Hosting + Functions
1) Instala la CLI de Firebase si aún no la tienes:
```bash
npm install -g firebase-tools
```
2) Construye la aplicación web:
```bash
npm run build:web
npm run build:functions
```
3) Autentícate e implementa en Firebase:
```bash
firebase login
firebase deploy --only hosting,functions
```
La configuración de Firebase se encuentra en `firebase.json` y `.firebaserc`.

### Pruebas y CI
Las pruebas unitarias se ejecutan con `pytest`:

```bash
cd api
pytest
```

Un flujo de trabajo de GitHub Actions (`.github/workflows/tests.yml`) ejecuta estas pruebas en cada *push* o *pull request*.

El flujo `.github/workflows/ci-cd.yaml` realiza lint, pruebas, compilación y despliegue automático a Firebase al hacer push a `main`.

### Logging
La API utiliza logging estructurado basado en la configuración estándar de Python, controlado por la variable de entorno `LOG_LEVEL`.