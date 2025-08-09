import React from 'react';
import { createRoot } from 'react-dom/client';
import App from './App';
import './index.css';
import { useUi } from './lib/store';

useUi.getState().init();

if ('serviceWorker' in navigator) {
  window.addEventListener('load', () => {
    navigator.serviceWorker.register('/sw.js').catch(console.error);
  });
}

createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
);
