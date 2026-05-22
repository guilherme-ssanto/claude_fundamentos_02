export function FeedbackOverlay({ isCorrect, explanation, onNext }) {
  return (
    <div
      className={`mt-4 rounded-xl p-5 border-2 ${
        isCorrect
          ? 'bg-success/10 border-success text-success'
          : 'bg-error/10 border-error text-error'
      }`}
    >
      <p className="font-bold text-lg mb-1">
        {isCorrect ? 'Correto!' : 'Incorreto!'}
      </p>
      <p className="text-sm text-text-primary mb-4">{explanation}</p>
      <button
        onClick={onNext}
        className="bg-text-primary hover:opacity-80 text-white text-sm font-semibold px-5 py-2.5 rounded-lg transition-opacity"
      >
        Próxima Pergunta
      </button>
    </div>
  )
}
