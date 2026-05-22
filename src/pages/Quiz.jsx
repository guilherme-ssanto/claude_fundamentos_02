import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { useQuiz } from '@/hooks/useQuiz'
import { useTimer } from '@/hooks/useTimer'
import { QuestionCard } from '@/components/quiz/QuestionCard'
import { FeedbackOverlay } from '@/components/quiz/FeedbackOverlay'

const TOTAL_TIME = 20

export default function Quiz() {
  const navigate = useNavigate()
  const { currentQuestion, currentIndex, phase, lastResult, scores, submitAnswer, nextQuestion, resetQuiz } = useQuiz()

  function handleExpire() {
    if (phase === 'answering') {
      submitAnswer(null, true)
    }
  }

  const { timeLeft, resetTimer, stopTimer } = useTimer(TOTAL_TIME, handleExpire)

  useEffect(() => {
    if (phase === 'answering') {
      resetTimer()
    } else {
      stopTimer()
    }
  }, [currentIndex, phase, resetTimer, stopTimer])

  useEffect(() => {
    if (phase === 'finished') {
      navigate('/result', { state: scores })
    }
  }, [phase, navigate, scores])

  function handleAnswer(userAnswer) {
    stopTimer()
    submitAnswer(userAnswer)
  }

  function handleNext() {
    nextQuestion()
  }

  if (phase === 'finished') return null

  return (
    <div>
      <QuestionCard
        question={currentQuestion}
        questionIndex={currentIndex}
        timeLeft={timeLeft}
        totalTime={TOTAL_TIME}
        onAnswer={handleAnswer}
        disabled={phase === 'feedback'}
      />
      {phase === 'feedback' && lastResult && (
        <FeedbackOverlay
          isCorrect={lastResult.isCorrect}
          explanation={currentQuestion.explanation}
          onNext={handleNext}
        />
      )}
    </div>
  )
}
