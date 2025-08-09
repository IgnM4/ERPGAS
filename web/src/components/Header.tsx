import React from 'react';
import { useUi } from '../lib/store';

export default function Header() {
  const { dark, setDark } = useUi();
  return (
    <header
      role="banner"
      className="mb-6 rounded-2xl p-4 text-white flex items-center justify-between bg-[var(--color-primary)]"
      style={{ fontFamily: 'var(--font-family)' }}
    >
      <h1 className="text-xl font-bold">ERP Gas</h1>
      <button
        onClick={() => setDark(!dark)}
        className="rounded bg-white/20 px-3 py-1 text-sm hover:bg-white/30 transition"
        aria-label="Toggle theme"
      >
        🌓
      </button>
    </header>
  );
}
