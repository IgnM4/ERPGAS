import create from 'zustand';

const storageKey = 'ui';

interface UiState {
  dark: boolean;
  primary: string;
  font: string;
  init: () => void;
  setDark: (v: boolean) => void;
  setPrimary: (c: string) => void;
  setFont: (f: string) => void;
}

export const useUi = create<UiState>((set, get) => ({
  dark: false,
  primary: '#FB923C',
  font: 'sans-serif',
  init: () => {
    const raw = localStorage.getItem(storageKey);
    if (raw) {
      const data = JSON.parse(raw);
      set({ dark: data.dark ?? false, primary: data.primary || '#FB923C', font: data.font || 'sans-serif' });
      document.documentElement.classList.toggle('dark', data.dark);
      document.documentElement.style.setProperty('--color-primary', data.primary || '#FB923C');
      document.documentElement.style.setProperty('--font-family', data.font || 'sans-serif');
    } else {
      document.documentElement.style.setProperty('--color-primary', '#FB923C');
      document.documentElement.style.setProperty('--font-family', 'sans-serif');
    }
  },
  setDark: (dark) => {
    set({ dark });
    localStorage.setItem(storageKey, JSON.stringify({ ...get(), dark }));
    document.documentElement.classList.toggle('dark', dark);
  },
  setPrimary: (primary) => {
    set({ primary });
    localStorage.setItem(storageKey, JSON.stringify({ ...get(), primary }));
    document.documentElement.style.setProperty('--color-primary', primary);
  },
  setFont: (font) => {
    set({ font });
    localStorage.setItem(storageKey, JSON.stringify({ ...get(), font }));
    document.documentElement.style.setProperty('--font-family', font);
  },
}));
