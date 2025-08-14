# Nueva Arquitectura Profesional

Este documento describe la migración del proyecto a una arquitectura profesional que utiliza **Java** para el backend, **React + TypeScript** para el frontend y **Firebase** para autenticación, almacenamiento de archivos, mensajería y despliegue.

## Visión General de la Plataforma

- **Backend:** Java 17+, Spring Boot 3.
- **Frontend:** React 18, TypeScript, Vite.
- **Firebase Console:** Authentication, Cloud Firestore, Cloud Storage, Cloud Messaging, Hosting.
- **Patrones Clave:** Arquitectura en capas (Controller → Service → Repository), DTOs, interfaces para contratos, separación de responsabilidades y uso de inyección de dependencias.

---

## Backend (Java)

### Estructura de Carpetas

```
backend/
├── pom.xml
└── src/
    ├── main/
    │   ├── java/
    │   │   └── com/erpgas/
    │   │       ├── Application.java
    │   │       ├── config/
    │   │       │   └── FirebaseConfig.java
    │   │       ├── controller/
    │   │       │   ├── AuthController.java
    │   │       │   └── UserController.java
    │   │       ├── dto/
    │   │       │   ├── LoginRequest.java
    │   │       │   └── UserResponse.java
    │   │       ├── model/
    │   │       │   └── User.java
    │   │       ├── repository/
    │   │       │   └── UserRepository.java
    │   │       └── service/
    │   │           ├── AuthService.java
    │   │           └── UserService.java
    │   └── resources/
    │       └── application.yml
    └── test/
        └── java/
```

### Esqueletos de Código

**`Application.java`**
```java
@SpringBootApplication
public class Application {
  public static void main(String[] args) {
    SpringApplication.run(Application.class, args);
  }
}
```

**`FirebaseConfig.java`**
```java
@Configuration
public class FirebaseConfig {
  @Bean
  public FirebaseApp firebaseApp() throws IOException {
    // Inicializa Firebase con credenciales de servicio
    return FirebaseApp.initializeApp();
  }

  @Bean
  public FirebaseAuth firebaseAuth(FirebaseApp app) {
    return FirebaseAuth.getInstance(app);
  }
}
```

**`AuthController.java`**
```java
@RestController
@RequestMapping("/api/auth")
public class AuthController {
  private final AuthService authService;
  public AuthController(AuthService authService) { this.authService = authService; }

  @PostMapping("/login")
  public UserResponse login(@RequestBody LoginRequest request) {
    return authService.login(request);
  }
}
```

**`AuthService.java`**
```java
@Service
public class AuthService {
  private final FirebaseAuth firebaseAuth;
  public AuthService(FirebaseAuth firebaseAuth) { this.firebaseAuth = firebaseAuth; }

  public UserResponse login(LoginRequest request) throws FirebaseAuthException {
    FirebaseToken token = firebaseAuth.verifyIdToken(request.token());
    return new UserResponse(token.getUid(), token.getEmail(), token.getName());
  }
}
```

**`UserRepository.java`**
```java
public interface UserRepository {
  Optional<User> findById(String id);
  User save(User user);
}
```

### Contratos de API

| Método & Endpoint      | Request Body                     | Response                         |
|-----------------------|----------------------------------|----------------------------------|
| `POST /api/auth/login`| `{ token: string }`              | `{ id, email, displayName }`     |
| `GET /api/users/{id}` | `-` (Header: `Authorization` JWT)| `{ id, email, displayName }`     |

---

## Frontend (React + TypeScript)

### Estructura de Carpetas

```
frontend/
├── package.json
├── tsconfig.json
└── src/
    ├── App.tsx
    ├── index.tsx
    ├── components/
    │   └── Navbar.tsx
    ├── pages/
    │   ├── Login.tsx
    │   └── Dashboard.tsx
    ├── services/
    │   ├── api.ts
    │   └── auth.ts
    ├── interfaces/
    │   └── user.ts
    └── firebase/
        └── config.ts
```

### Esqueletos de Código

**`src/firebase/config.ts`**
```ts
import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';
import { getMessaging } from 'firebase/messaging';
import { getStorage } from 'firebase/storage';

const firebaseConfig = {
  apiKey: import.meta.env.VITE_API_KEY,
  authDomain: import.meta.env.VITE_AUTH_DOMAIN,
  projectId: import.meta.env.VITE_PROJECT_ID,
  storageBucket: import.meta.env.VITE_STORAGE_BUCKET,
  messagingSenderId: import.meta.env.VITE_MESSAGING_SENDER_ID,
  appId: import.meta.env.VITE_APP_ID
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);
export const messaging = getMessaging(app);
export const storage = getStorage(app);
```

**`src/services/api.ts`**
```ts
import axios from 'axios';

export const api = axios.create({ baseURL: '/api' });

export const setAuthToken = (token: string) => {
  api.defaults.headers.common['Authorization'] = `Bearer ${token}`;
};
```

**`src/services/auth.ts`**
```ts
import { signInWithPopup, GoogleAuthProvider } from 'firebase/auth';
import { auth } from '../firebase/config';

export async function loginWithGoogle() {
  const provider = new GoogleAuthProvider();
  const result = await signInWithPopup(auth, provider);
  const token = await result.user.getIdToken();
  return token;
}
```

**`App.tsx`**
```tsx
export default function App() {
  return (
    <div className="min-h-screen">
      <h1>ERPGAS</h1>
    </div>
  );
}
```

### Estándares de Desarrollo
- Componentes funcionales y hooks.
- Estado global mediante Context API o librerías como Redux Toolkit.
- Tipado estricto mediante interfaces y tipos de TypeScript.

---

## Integración con Firebase
- **Autenticación:** Firebase Authentication con OAuth (Google, email, etc.).
- **Almacenamiento:** Cloud Storage para guardar documentos e imágenes.
- **Base de Datos:** Cloud Firestore para datos en tiempo real.
- **Mensajería:** Cloud Messaging para notificaciones push.
- **Despliegue:** Hosting para frontend y opcionalmente Cloud Run/App Engine para el backend Java.

---

## Flujo de Desarrollo Recomendado
1. Inicializar Firebase y obtener credenciales de servicio.
2. Desarrollar el backend con Spring Boot y asegurar endpoints con tokens de Firebase.
3. Construir el frontend en React + TypeScript, consumiendo la API Java y servicios de Firebase.
4. Implementar pruebas unitarias y de integración.
5. Desplegar frontend en Firebase Hosting y backend en una plataforma compatible (Cloud Run/App Engine).

---

Esta guía proporciona una base lista para comenzar la migración y desarrollo del proyecto con un stack moderno y escalable.
