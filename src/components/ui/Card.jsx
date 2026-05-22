export function Card({ children, className = '' }) {
  return (
    <div className={`bg-bg-card rounded-2xl shadow-sm p-6 ${className}`}>
      {children}
    </div>
  )
}
