import { LeaderboardRow } from './LeaderboardRow'

export function LeaderboardTable({ entries, currentUserId }) {
  return (
    <div className="overflow-x-auto">
      <table className="w-full">
        <thead>
          <tr className="border-b-2 border-border-subtle">
            <th className="py-3 px-4 text-center text-xs font-semibold uppercase tracking-wide text-text-muted w-12">#</th>
            <th className="py-3 px-4 text-left text-xs font-semibold uppercase tracking-wide text-text-muted">Jogador</th>
            <th className="py-3 px-4 text-center text-xs font-semibold uppercase tracking-wide text-text-muted">Score</th>
            <th className="py-3 px-4 text-center text-xs font-semibold uppercase tracking-wide text-text-muted hidden sm:table-cell">Ini · Int · Adv</th>
            <th className="py-3 px-4 text-center text-xs font-semibold uppercase tracking-wide text-text-muted hidden md:table-cell">Data</th>
          </tr>
        </thead>
        <tbody>
          {entries.map((entry, idx) => (
            <LeaderboardRow
              key={entry.user_id}
              entry={entry}
              position={idx + 1}
              isCurrentUser={entry.user_id === currentUserId}
            />
          ))}
        </tbody>
      </table>
    </div>
  )
}
