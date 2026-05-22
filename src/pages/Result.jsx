import { useEffect, useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import { supabase } from '@/lib/supabase'
import { useAuth } from '@/hooks/useAuth'

function getMessage(score) {
  if (score <= 5) return 'Continue estudando — o Claude Code tem muito a oferecer!'
  if (score <= 10) return 'Bom começo! Você já conhece o essencial.'
  if (score <= 13) return 'Muito bem! Você domina o Claude Code.'
  return 'Perfeito! Você é um expert em Claude Code!'
}

export default function Result() {
  const { state } = useLocation()
  const navigate = useNavigate()
  const { user } = useAuth()
  const [saving, setSaving] = useState(true)
  const [saveError, setSaveError] = useState('')

  const { score = 0, score_ini = 0, score_int = 0, score_adv = 0 } = state || {}

  useEffect(() => {
    if (!user || state === null) {
      navigate('/')
      return
    }

    async function saveScore() {
      try {
        const { data: existing, error: fetchErr } = await supabase
          .from('scores')
          .select('score')
          .eq('user_id', user.id)
          .order('score', { ascending: false })
          .limit(1)
          .maybeSingle()

        if (fetchErr) throw fetchErr

        const bestExisting = existing?.score ?? -1

        if (score > bestExisting) {
          const userName = user.user_metadata?.full_name || user.email.split('@')[0]
          await supabase.from('scores').insert({
            user_id: user.id,
            user_name: userName,
            score,
            score_ini,
            score_int,
            score_adv,
          })
        }
      } catch {
        setSaveError('Não foi possível salvar seu score. Verifique sua conexão.')
      } finally {
        setSaving(false)
      }
    }

    saveScore()
  }, []) // intentionally runs once on mount — score is saved exactly once per result visit

  return (
    <div className="flex flex-col items-center gap-6">
      <div className="bg-bg-card rounded-2xl shadow-sm p-8 w-full text-center">
        <p className="text-text-muted text-sm mb-2 uppercase tracking-wide font-semibold">Resultado Final</p>
        <p className="text-6xl font-bold text-primary mb-1">{score}</p>
        <p className="text-text-muted mb-4">de 15 corretas</p>
        <p className="text-text-primary font-medium text-lg">{getMessage(score)}</p>
        {saving && <p className="text-text-muted text-sm mt-3">Salvando resultado...</p>}
        {saveError && <p className="text-error text-sm mt-3">{saveError}</p>}
      </div>

      <div className="grid grid-cols-3 gap-3 w-full">
        {[
          { label: 'Iniciante', value: score_ini, color: '#3B82F6' },
          { label: 'Intermediário', value: score_int, color: '#F59E0B' },
          { label: 'Avançado', value: score_adv, color: '#8B5CF6' },
        ].map(({ label, value, color }) => (
          <div key={label} className="bg-bg-card rounded-xl shadow-sm p-4 text-center">
            <p className="text-2xl font-bold" style={{ color }}>{value}<span className="text-text-muted text-base font-normal">/5</span></p>
            <p className="text-xs text-text-muted mt-1">{label}</p>
          </div>
        ))}
      </div>

      <div className="flex flex-col sm:flex-row gap-3 w-full">
        <button
          onClick={() => navigate('/leaderboard')}
          className="flex-1 bg-primary hover:bg-primary-dark text-white font-semibold py-3 rounded-xl transition-colors"
        >
          Ver Leaderboard
        </button>
        <button
          onClick={() => navigate('/quiz')}
          className="flex-1 border-2 border-primary text-primary hover:bg-primary hover:text-white font-semibold py-3 rounded-xl transition-colors"
        >
          Tentar Novamente
        </button>
      </div>
    </div>
  )
}
