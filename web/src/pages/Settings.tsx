import { ChangeEvent } from 'react';
import { useUi, useConfig } from '../lib/store';

export default function Settings() {
  const { dark, setDark, primary, setPrimary, font, setFont } = useUi();
  const { apiBase, setApiBase, company, setCompany, currency, setCurrency, load } = useConfig();

  const exportConfig = () => {
    const data = {
      ui: { dark, primary, font },
      config: { apiBase, company, currency },
    };
    const blob = new Blob([JSON.stringify(data)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'config.json';
    a.click();
    URL.revokeObjectURL(url);
  };

  const importConfig = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = () => {
      try {
        const data = JSON.parse(reader.result as string);
        if (data.ui) {
          if (typeof data.ui.dark === 'boolean') setDark(data.ui.dark);
          if (typeof data.ui.primary === 'string') setPrimary(data.ui.primary);
          if (typeof data.ui.font === 'string') setFont(data.ui.font);
        }
        if (data.config) {
          load(data.config);
        }
      } catch (err) {
        console.error(err);
      }
    };
    reader.readAsText(file);
  };
  return (
    <div className="space-y-4 max-w-sm">
      <div className="flex items-center gap-2">
        <label htmlFor="dark">Dark mode</label>
        <input id="dark" type="checkbox" checked={dark} onChange={e => setDark(e.target.checked)} />
      </div>
      <div className="flex items-center gap-2">
        <label htmlFor="color">Color primario</label>
        <input id="color" type="color" value={primary} onChange={e => setPrimary(e.target.value)} />
      </div>
      <div className="flex items-center gap-2">
        <label htmlFor="font">Tipografía</label>
        <select id="font" value={font} onChange={e => setFont(e.target.value)} className="border p-1">
          <option value="sans-serif">Sans</option>
          <option value="serif">Serif</option>
        </select>
      </div>
      <div className="flex items-center gap-2">
        <label htmlFor="api">API base</label>
        <input id="api" type="text" value={apiBase} onChange={e => setApiBase(e.target.value)} className="border p-1 flex-1" />
      </div>
      <div className="flex items-center gap-2">
        <label htmlFor="company">Empresa</label>
        <input id="company" type="text" value={company} onChange={e => setCompany(e.target.value)} className="border p-1 flex-1" />
      </div>
      <div className="flex items-center gap-2">
        <label htmlFor="currency">Moneda</label>
        <input id="currency" type="text" value={currency} onChange={e => setCurrency(e.target.value)} className="border p-1 flex-1" />
      </div>
      <div className="flex items-center gap-2">
        <button onClick={exportConfig} className="border p-1">Exportar</button>
        <input type="file" accept="application/json" onChange={importConfig} />
      </div>
    </div>
  );
}
