export default function Card({ title, value }: { title: string, value: string | number }) {
  return (
    <div className="rounded-2xl shadow p-4 bg-white dark:bg-slate-800">
      <div className="text-xs uppercase text-slate-500">{title}</div>
      <div className="text-2xl font-semibold">{value}</div>
    </div>
  )
}