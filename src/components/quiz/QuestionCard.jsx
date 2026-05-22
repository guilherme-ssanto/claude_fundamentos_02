import { LevelBadge } from './LevelBadge'
import { ProgressBar } from './ProgressBar'
import { Timer } from './Timer'

export function QuestionCard({ question, questionIndex, timeLeft, totalTime = 20, onAnswer, disabled }) {
  return (
    <div className="bg-bg-card rounded-2xl shadow-sm p-6">
      <ProgressBar current={questionIndex} total={15} />

      <div className="flex items-center justify-between mt-4 mb-6">
        <div className="flex items-center gap-3">
          <LevelBadge level={question.level} />
          <span className="text-sm text-text-muted">
            Pergunta {questionIndex + 1} de 15
          </span>
        </div>
        <Timer timeLeft={timeLeft} totalTime={totalTime} />
      </div>

      <p className="text-xl font-medium text-text-primary mb-8 leading-relaxed">
        {question.statement}
      </p>

      <div className="flex gap-3 flex-col sm:flex-row">
        <button
          onClick={() => onAnswer(true)}
          disabled={disabled}
          aria-label="Verdadeiro"
          className="flex-1 h-16 flex items-center justify-center gap-2 font-semibold text-base rounded-xl border-2 border-success text-success hover:bg-success hover:text-white transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
        >
          <span>✓</span> VERDADEIRO
        </button>
        <button
          onClick={() => onAnswer(false)}
          disabled={disabled}
          aria-label="Falso"
          className="flex-1 h-16 flex items-center justify-center gap-2 font-semibold text-base rounded-xl border-2 border-error text-error hover:bg-error hover:text-white transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
        >
          <span>✗</span> FALSO
        </button>
      </div>
    </div>
  )
}
