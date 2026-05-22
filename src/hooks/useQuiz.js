import { useState, useCallback } from 'react'
import { questions } from '@/data/questions'

function calcScores(answers) {
  const score = answers.filter(a => a.isCorrect).length
  const score_ini = answers.filter(a => a.isCorrect && a.level === 'iniciante').length
  const score_int = answers.filter(a => a.isCorrect && a.level === 'intermediário').length
  const score_adv = answers.filter(a => a.isCorrect && a.level === 'avançado').length
  return { score, score_ini, score_int, score_adv }
}

export function useQuiz() {
  const [currentIndex, setCurrentIndex] = useState(0)
  const [answers, setAnswers] = useState([])
  const [phase, setPhase] = useState('answering') // 'answering' | 'feedback'
  const [lastResult, setLastResult] = useState(null)

  const currentQuestion = questions[currentIndex]

  const submitAnswer = useCallback((userAnswer, timedOut = false) => {
    const question = questions[currentIndex]
    const isCorrect = !timedOut && userAnswer === question.answer
    const result = {
      questionId: question.id,
      level: question.level,
      userAnswer,
      isCorrect,
      timedOut,
    }
    setAnswers(prev => [...prev, result])
    setLastResult(result)
    setPhase('feedback')
  }, [currentIndex])

  const nextQuestion = useCallback(() => {
    const nextIndex = currentIndex + 1
    if (nextIndex >= questions.length) {
      setPhase('finished')
    } else {
      setCurrentIndex(nextIndex)
      setPhase('answering')
      setLastResult(null)
    }
  }, [currentIndex])

  const resetQuiz = useCallback(() => {
    setCurrentIndex(0)
    setAnswers([])
    setPhase('answering')
    setLastResult(null)
  }, [])

  const scores = calcScores(answers)

  return {
    currentQuestion,
    currentIndex,
    phase,
    lastResult,
    scores,
    submitAnswer,
    nextQuestion,
    resetQuiz,
  }
}
