import create from 'zustand';

const uiKey = 'ui';
const configKey = 'config';

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
    const raw = localStorage.getItem(uiKey);
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
    localStorage.setItem(uiKey, JSON.stringify({ ...get(), dark }));
    document.documentElement.classList.toggle('dark', dark);
  },
  setPrimary: (primary) => {
    set({ primary });
    localStorage.setItem(uiKey, JSON.stringify({ ...get(), primary }));
    document.documentElement.style.setProperty('--color-primary', primary);
  },
  setFont: (font) => {
    set({ font });
    localStorage.setItem(uiKey, JSON.stringify({ ...get(), font }));
    document.documentElement.style.setProperty('--font-family', font);
  },
}));

interface ConfigState {
  apiBase: string;
  company: string;
  currency: string;
  init: () => void;
  setApiBase: (v: string) => void;
  setCompany: (v: string) => void;
  setCurrency: (v: string) => void;
  load: (data: Partial<Pick<ConfigState, 'apiBase' | 'company' | 'currency'>>) => void;
}

export const useConfig = create<ConfigState>((set, get) => {
  const save = () => {
    const { apiBase, company, currency } = get();
    localStorage.setItem(configKey, JSON.stringify({ apiBase, company, currency }));
  };
  return {
    apiBase: '/api',
    company: '',
    currency: 'USD',
    init: () => {
      const raw = localStorage.getItem(configKey);
      if (raw) {
        try {
          const data = JSON.parse(raw);
          set({
            apiBase: data.apiBase || '/api',
            company: data.company || '',
            currency: data.currency || 'USD',
          });
        } catch (e) {
          console.error(e);
        }
      }
    },
    setApiBase: (apiBase) => {
      set({ apiBase });
      save();
    },
    setCompany: (company) => {
      set({ company });
      save();
    },
    setCurrency: (currency) => {
      set({ currency });
      save();
    },
    load: (data) => {
      set({
        apiBase: data.apiBase ?? get().apiBase,
        company: data.company ?? get().company,
        currency: data.currency ?? get().currency,
      });
      save();
    },
  };
});
