import { useUi } from '../lib/store';

export default function Settings() {
  const { dark, setDark, primary, setPrimary, font, setFont } = useUi();
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
    </div>
  );
}
