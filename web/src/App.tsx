import { useEffect, useState } from 'react'
import Nav from './components/Nav'
import Header from './components/Header'
import Dashboard from './pages/Dashboard'
import Inventory from './pages/Inventory'
import Clients from './pages/Clients'
import Prices from './pages/Prices'
import Sales from './pages/Sales'
import Purchases from './pages/Purchases'
import Cashbox from './pages/Cashbox'

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
  return (
    <div className="flex min-h-screen">
      <Nav />
      <main className="flex-1 p-6 bg-slate-50 dark:bg-slate-900">
        <Header />
        {route === '/' && <Dashboard />}
        {route === '/inventory' && <Inventory />}
        {route === '/prices' && <Prices />}
        {route === '/clients' && <Clients />}
        {route === '/sales' && <Sales />}
        {route === '/purchases' && <Purchases />}
        {route === '/cash' && <Cashbox />}
      </main>
    </div>
  )
}
