const RADIUS = 40
const CIRCUMFERENCE = 2 * Math.PI * RADIUS

function getColor(timeLeft) {
  if (timeLeft <= 4) return '#DC2626'
  if (timeLeft <= 8) return '#F59E0B'
  return '#D97757'
}

export function Timer({ timeLeft, totalTime }) {
  const progress = timeLeft / totalTime
  const offset = CIRCUMFERENCE * (1 - progress)
  const color = getColor(timeLeft)

  return (
    <div className="relative flex items-center justify-center w-24 h-24" aria-label={`${timeLeft} segundos restantes`}>
      <svg width="96" height="96" className="-rotate-90">
        <circle
          cx="48" cy="48" r={RADIUS}
          fill="none"
          stroke="#E5E7EB"
          strokeWidth="6"
        />
        <circle
          cx="48" cy="48" r={RADIUS}
          fill="none"
          stroke={color}
          strokeWidth="6"
          strokeDasharray={CIRCUMFERENCE}
          strokeDashoffset={offset}
          strokeLinecap="round"
          style={{ transition: 'stroke-dashoffset 0.5s linear, stroke 0.3s' }}
        />
      </svg>
      <span className="absolute font-bold text-2xl" style={{ color }}>
        {timeLeft}
      </span>
    </div>
  )
}
