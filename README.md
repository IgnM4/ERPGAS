# ERP Gas — Firebase + React

Proyecto de ejemplo con Firebase Auth (email y proveedores Google/Facebook), Firestore y Cloud Functions con Express. Incluye control de roles mediante *custom claims* y una interfaz React + Vite + TailwindCSS con tema claro/oscuro personalizable.

### Requisitos
- Docker y Docker Compose instalados.
- Node.js 20

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
Ejecuta las pruebas de la web y las funciones:

```bash
npm run test:web
npm run test:functions
```

Los flujos de trabajo de GitHub Actions (`.github/workflows/ci-cd.yaml`) realizan lint, pruebas, compilación y despliegue automático a Firebase al hacer push a `main`.

### API
Los endpoints disponibles se describen en `/#/docs` una vez desplegado el sitio.

### Aplicación de escritorio

La aplicación de escritorio empaqueta el *frontend* web y el servidor FastAPI.

1. Genera los ejecutables para tu plataforma:

   ```bash
   npm run build:desktop
   ```

   Este comando compila `web` y crea instaladores mediante Electron Builder.

2. Los instaladores resultantes se guardan en `desktop/dist`:

   - **Windows**: `*.exe` (NSIS)
   - **Linux**: `*.AppImage`
   - **macOS**: `*.dmg`

Ejecuta el comando anterior en cada sistema operativo para obtener su instalador correspondiente.
