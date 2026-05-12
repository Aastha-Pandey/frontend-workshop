import { useCallback, useEffect, useState } from 'react'

const useCounter = () => {
  const [count, setCount] = useState(0)

  const handleIncrement = useCallback(() => {
    setCount((prevcount) => prevcount + 1)
  }, [])
  const handleDecrement = useCallback(() => {
    setCount((prevcount) => Math.max(0, prevcount - 1))
  }, [])
  const handleReset = useCallback(() => {
    setCount(0)
  }, [])

  useEffect(() => {
    function handleKeyDown(e) {
      if (e.key === 'ArrowUp') {
        handleIncrement()
      } else if (e.key === 'ArrowDown') {
        handleDecrement()
      } else if (e.key === 'r') {
        handleReset()
      }
    }
    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [])

  return { handleIncrement, handleDecrement, handleReset, count }
}

export default useCounter
