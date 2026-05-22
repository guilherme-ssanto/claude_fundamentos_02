import { AuthButton } from './AuthButton'
import logo from '../../../asset/logo-tm1.png'

export function Header({ user, onSignOut }) {
  return (
    <header className="bg-bg-card border-b border-border-subtle px-4 py-3">
      <div className="max-w-2xl mx-auto flex items-center justify-between">
        <div className="flex items-center gap-3">
          <img src={logo} alt="TM1" className="h-7 w-auto" />
          <span className="font-bold text-primary text-lg">Claude Code Quiz</span>
        </div>
        {user && (
          <div className="flex items-center gap-3">
            <span className="text-sm text-text-muted hidden sm:block truncate max-w-[200px]">
              {user.email}
            </span>
            <AuthButton onSignOut={onSignOut} />
          </div>
        )}
      </div>
    </header>
  )
}
