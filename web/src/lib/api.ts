import { useConfig } from './store';

export async function api(path: string, options?: RequestInit) {
  const base = useConfig.getState().apiBase || '';
  const res = await fetch(`${base}${path}`, {
    headers: { 'Content-Type': 'application/json', ...(options?.headers || {}) },
    ...options,
  });
  if (!res.ok) throw new Error(await res.text());
  return res.json();
}
