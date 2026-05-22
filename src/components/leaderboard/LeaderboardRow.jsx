export function LeaderboardRow({ entry, position, isCurrentUser }) {
  const initial = (entry.user_name || entry.user_email || '?')[0].toUpperCase()
  const date = new Date(entry.created_at).toLocaleDateString('pt-BR')

  return (
    <tr className={`border-b border-border-subtle ${isCurrentUser ? 'bg-primary/10 font-semibold' : 'hover:bg-bg-subtle'}`}>
      <td className="py-3 px-4 text-center text-text-muted text-sm w-12">{position}</td>
      <td className="py-3 px-4">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-full bg-primary flex items-center justify-center text-white text-sm font-bold flex-shrink-0">
            {initial}
          </div>
          <span className="text-sm text-text-primary truncate max-w-[140px]">{entry.user_name}</span>
          {isCurrentUser && <span className="text-xs text-primary font-medium">(você)</span>}
        </div>
      </td>
      <td className="py-3 px-4 text-center font-bold text-text-primary">{entry.score}<span className="text-text-muted font-normal text-xs">/15</span></td>
      <td className="py-3 px-4 text-center text-xs text-text-muted hidden sm:table-cell">
        {entry.score_ini}/5 · {entry.score_int}/5 · {entry.score_adv}/5
      </td>
      <td className="py-3 px-4 text-center text-xs text-text-muted hidden md:table-cell">{date}</td>
    </tr>
  )
}
