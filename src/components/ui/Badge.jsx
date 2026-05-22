export function Badge({ label, color }) {
  return (
    <span
      className="text-xs font-semibold uppercase tracking-wide px-2.5 py-1 rounded-full text-white"
      style={{ backgroundColor: color }}
    >
      {label}
    </span>
  )
}
