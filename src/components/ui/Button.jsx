const variants = {
  primary: 'bg-primary hover:bg-primary-dark text-white',
  secondary: 'border border-gray-300 hover:bg-gray-50 text-text-primary',
  success: 'bg-success hover:bg-green-700 text-white',
  error: 'bg-error hover:bg-red-700 text-white',
}

export function Button({ variant = 'primary', disabled, onClick, children, className = '', ...props }) {
  return (
    <button
      onClick={onClick}
      disabled={disabled}
      className={`font-semibold rounded-xl transition-colors disabled:opacity-60 disabled:cursor-not-allowed ${variants[variant]} ${className}`}
      {...props}
    >
      {children}
    </button>
  )
}
