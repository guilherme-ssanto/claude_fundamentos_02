import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { supabase } from '@/lib/supabase'
import { useAuth } from '@/hooks/useAuth'
import { LeaderboardTable } from '@/components/leaderboard/LeaderboardTable'

async function fetchLeaderboard() {
  const { data, error } = await supabase
    .from('leaderboard')
    .select('*')
    .order('score', { ascending: false })
    .limit(20)
  if (error) throw error
  return data
}

export default function Leaderboard() {
  const navigate = useNavigate()
  const { user } = useAuth()
  const [entries, setEntries] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  useEffect(() => {
    fetchLeaderboard()
      .then(data => setEntries(data))
      .catch(() => setError('Não foi possível carregar o leaderboard.'))
      .finally(() => setLoading(false))

    const channel = supabase
      .channel('leaderboard-changes')
      .on('postgres_changes', { event: 'INSERT', schema: 'public', table: 'scores' }, () => {
        fetchLeaderboard()
          .then(data => setEntries(data))
          .catch(() => {})
      })
      .subscribe()

    return () => supabase.removeChannel(channel)
  }, [])

  return (
    <div className="flex flex-col gap-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold text-text-primary">Leaderboard</h1>
        <div className="flex items-center gap-2">
          <span className="w-2 h-2 rounded-full bg-success animate-pulse" />
          <span className="text-xs text-text-muted">Ao vivo</span>
        </div>
      </div>

      <div className="bg-bg-card rounded-2xl shadow-sm overflow-hidden">
        {loading && (
          <p className="text-center text-text-muted py-12">Carregando...</p>
        )}
        {error && (
          <p className="text-center text-error py-12">{error}</p>
        )}
        {!loading && !error && entries.length === 0 && (
          <p className="text-center text-text-muted py-12">Nenhum score ainda. Seja o primeiro!</p>
        )}
        {!loading && !error && entries.length > 0 && (
          <LeaderboardTable entries={entries} currentUserId={user?.id} />
        )}
      </div>

      <button
        onClick={() => navigate('/')}
        className="border-2 border-border-subtle hover:border-primary text-text-muted hover:text-primary font-semibold py-3 rounded-xl transition-colors"
      >
        Voltar ao Início
      </button>
    </div>
  )
}
