import { useState, useRef, useCallback } from 'react'

export function useTimer(initialTime, onExpire) {
  const [timeLeft, setTimeLeft] = useState(initialTime)
  const intervalRef = useRef(null)
  const onExpireRef = useRef(onExpire)
  onExpireRef.current = onExpire

  const stopTimer = useCallback(() => {
    if (intervalRef.current) {
      clearInterval(intervalRef.current)
      intervalRef.current = null
    }
  }, [])

  const resetTimer = useCallback(() => {
    stopTimer()
    setTimeLeft(initialTime)
    intervalRef.current = setInterval(() => {
      setTimeLeft(prev => {
        if (prev <= 1) {
          clearInterval(intervalRef.current)
          intervalRef.current = null
          onExpireRef.current()
          return 0
        }
        return prev - 1
      })
    }, 1000)
  }, [initialTime, stopTimer])

  return { timeLeft, resetTimer, stopTimer }
}
