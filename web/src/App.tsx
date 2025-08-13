import { useEffect, useState, lazy, Suspense } from 'react';
import Nav from './components/Nav';
import Header from './components/Header';
import {
  useUser,
  loginWithGoogle,
  loginWithFacebook,
  loginWithEmail,
  registerWithEmail,
  resetPassword,
  logout,
} from './lib/auth';

const Dashboard = lazy(() => import('./pages/Dashboard'));
const Inventory = lazy(() => import('./pages/Inventory'));
const Clients = lazy(() => import('./pages/Clients'));
const Prices = lazy(() => import('./pages/Prices'));
const Sales = lazy(() => import('./pages/Sales'));
const Purchases = lazy(() => import('./pages/Purchases'));
const Cashbox = lazy(() => import('./pages/Cashbox'));
const Settings = lazy(() => import('./pages/Settings'));
const Docs = lazy(() => import('./pages/Docs'));

function useHashRoute() {
  const [route, setRoute] = useState(location.hash.slice(1) || '/')
  useEffect(() => {
    const h = () => setRoute(location.hash.slice(1) || '/')
    addEventListener('hashchange', h)
    return () => removeEventListener('hashchange', h)
  }, [])
  return route
}

export default function App() {
  const route = useHashRoute()
  const user = useUser()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  async function handleRegister() {
    setLoading(true); setError('')
    try { await registerWithEmail(email, password); alert('Verifica tu correo') }
    catch (e: unknown) {
      if (e instanceof Error) {
        setError(e.message)
      }
    }
    finally { setLoading(false) }
  }

  async function handleLogin() {
    setLoading(true); setError('')
    try { await loginWithEmail(email, password) }
    catch (e: unknown) {
      if (e instanceof Error) {
        setError(e.message)
      }
    }
    finally { setLoading(false) }
  }

  async function handleReset() {
    try { await resetPassword(email); alert('Email de recuperación enviado') }
    catch (e: unknown) {
      if (e instanceof Error) {
        setError(e.message)
      }
    }
  }
  return (
    <div className="flex min-h-screen">
      <Nav />
      <main className="flex-1 p-6 bg-slate-50 dark:bg-slate-900">
        <Header />
        {!user && (
          <div className="mb-4 space-y-2 max-w-sm">
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Email"
              className="w-full rounded border p-2"
            />
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Password"
              className="w-full rounded border p-2"
            />
            {error && <div className="text-red-500 text-sm">{error}</div>}
            <div className="flex flex-wrap gap-2">
              <button
                onClick={handleRegister}
                disabled={loading}
                className="rounded bg-green-500 px-4 py-2 text-white"
              >
                Registro
              </button>
              <button
                onClick={handleLogin}
                disabled={loading}
                className="rounded bg-blue-500 px-4 py-2 text-white"
              >
                Login
              </button>
              <button
                onClick={() => loginWithGoogle()}
                className="rounded bg-red-500 px-4 py-2 text-white"
              >
                Google
              </button>
              <button
                onClick={() => loginWithFacebook()}
                className="rounded bg-blue-700 px-4 py-2 text-white"
              >
                Facebook
              </button>
              <button onClick={handleReset} type="button" className="text-sm underline">
                Recuperar contraseña
              </button>
            </div>
          </div>
        )}
        {user && (
          <div className="mb-4 flex items-center gap-2">
            <span className="text-sm">{user.email}</span>
            <button onClick={() => logout()} className="rounded bg-red-500 px-2 py-1 text-white text-xs">Logout</button>
          </div>
        )}
        <Suspense fallback={<div>Loading...</div>}>
          {route === '/' && <Dashboard />}
          {route === '/inventory' && <Inventory />}
          {route === '/prices' && <Prices />}
          {route === '/clients' && <Clients />}
          {route === '/sales' && <Sales />}
          {route === '/purchases' && <Purchases />}
          {route === '/cash' && <Cashbox />}
          {route === '/settings' && <Settings />}
          {route === '/docs' && <Docs />}
        </Suspense>
      </main>
    </div>
  )
}
