import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '@/hooks/useAuth'

export default function Home() {
  const { user, signIn, signUp } = useAuth()
  const navigate = useNavigate()
  const [isLogin, setIsLogin] = useState(true)
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)
  const [successMsg, setSuccessMsg] = useState('')

  async function handleSubmit(e) {
    e.preventDefault()
    setError('')
    setSuccessMsg('')
    setLoading(true)
    try {
      if (isLogin) {
        await signIn(email, password)
      } else {
        await signUp(email, password)
        setSuccessMsg('Conta criada! Verifique seu e-mail para confirmar o cadastro.')
      }
    } catch (err) {
      setError(err.message || 'Ocorreu um erro. Tente novamente.')
    } finally {
      setLoading(false)
    }
  }

  if (user) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[60vh] px-4 text-center">
        <div className="bg-bg-card rounded-2xl shadow-sm p-8 w-full max-w-md">
          <h1 className="text-3xl font-bold text-text-primary mb-2">Bem-vindo!</h1>
          <p className="text-text-muted mb-6">
            Pronto para testar seus conhecimentos sobre o Claude Code?
          </p>
          <p className="text-sm text-text-muted mb-8">{user.email}</p>
          <button
            onClick={() => navigate('/quiz')}
            className="w-full bg-primary hover:bg-primary-dark text-white font-semibold py-4 rounded-xl transition-colors text-lg"
          >
            Iniciar Quiz
          </button>
        </div>
      </div>
    )
  }

  return (
    <div className="flex flex-col items-center justify-center min-h-[60vh] px-4">
      <div className="bg-bg-card rounded-2xl shadow-sm p-8 w-full max-w-md">
        <h1 className="text-3xl font-bold text-text-primary mb-1">Claude Code Quiz</h1>
        <p className="text-text-muted mb-8 text-sm">
          15 perguntas sobre o Claude Code em 3 níveis de dificuldade.
        </p>

        <div className="flex mb-6 border border-border-subtle rounded-lg overflow-hidden">
          <button
            onClick={() => { setIsLogin(true); setError(''); setSuccessMsg('') }}
            className={`flex-1 py-2 text-sm font-medium transition-colors ${isLogin ? 'bg-primary text-white' : 'text-text-muted hover:bg-bg-subtle'}`}
          >
            Entrar
          </button>
          <button
            onClick={() => { setIsLogin(false); setError(''); setSuccessMsg('') }}
            className={`flex-1 py-2 text-sm font-medium transition-colors ${!isLogin ? 'bg-primary text-white' : 'text-text-muted hover:bg-bg-subtle'}`}
          >
            Criar conta
          </button>
        </div>

        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <input
            type="email"
            placeholder="E-mail"
            value={email}
            onChange={e => setEmail(e.target.value)}
            required
            className="bg-bg-subtle border border-border-subtle rounded-lg px-4 py-3 text-sm text-text-primary placeholder-text-muted focus:outline-none focus:border-primary"
          />
          <input
            type="password"
            placeholder="Senha"
            value={password}
            onChange={e => setPassword(e.target.value)}
            required
            minLength={6}
            className="bg-bg-subtle border border-border-subtle rounded-lg px-4 py-3 text-sm text-text-primary placeholder-text-muted focus:outline-none focus:border-primary"
          />
          {error && <p className="text-error text-sm">{error}</p>}
          {successMsg && <p className="text-success text-sm">{successMsg}</p>}
          <button
            type="submit"
            disabled={loading}
            className="bg-primary hover:bg-primary-dark disabled:opacity-60 text-white font-semibold py-3 rounded-xl transition-colors"
          >
            {loading ? 'Aguarde...' : isLogin ? 'Entrar' : 'Criar conta'}
          </button>
        </form>
      </div>
    </div>
  )
}
