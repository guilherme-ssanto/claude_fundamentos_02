export function AuthButton({ onSignOut }) {
  return (
    <button
      onClick={onSignOut}
      className="text-sm text-text-muted hover:text-error transition-colors"
      aria-label="Sair da conta"
    >
      Sair
    </button>
  )
}
