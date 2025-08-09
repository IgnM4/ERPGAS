const API = import.meta.env.VITE_API_BASE || 'http://localhost:8000'
const API_KEY = '' // opcional: setear si activas API Key

export async function api(path: string, init?: RequestInit) {
  const res = await fetch(`${API}${path}`, {
    headers: {
      'Content-Type': 'application/json',
      ...(API_KEY ? { 'x-api-key': API_KEY } : {}),
    },
    ...init,
  })
  if (!res.ok) throw new Error(await res.text())
  return res.json()
}