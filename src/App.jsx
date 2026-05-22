import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import { useAuth } from '@/hooks/useAuth'
import { Header } from '@/components/layout/Header'
import Home from '@/pages/Home'
import Quiz from '@/pages/Quiz'
import Result from '@/pages/Result'
import Leaderboard from '@/pages/Leaderboard'

function PrivateRoute({ children }) {
  const { user, loading } = useAuth()
  if (loading) return <div className="min-h-screen bg-bg-base flex items-center justify-center text-text-muted">Carregando...</div>
  if (!user) return <Navigate to="/" replace />
  return children
}

function Layout({ children }) {
  const { user, signOut } = useAuth()
  return (
    <div className="min-h-screen bg-bg-base">
      <Header user={user} onSignOut={signOut} />
      <main className="max-w-2xl mx-auto py-8 px-4">
        {children}
      </main>
    </div>
  )
}

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout><Home /></Layout>} />
        <Route path="/quiz" element={<PrivateRoute><Layout><Quiz /></Layout></PrivateRoute>} />
        <Route path="/result" element={<PrivateRoute><Layout><Result /></Layout></PrivateRoute>} />
        <Route path="/leaderboard" element={<PrivateRoute><Layout><Leaderboard /></Layout></PrivateRoute>} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </BrowserRouter>
  )
}
