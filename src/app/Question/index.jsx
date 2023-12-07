import React, { useState, useEffect } from 'react'
const Question = ({ question, onNext }) => {
  const [selectedAnswer, setSelectedAnswer] = useState()
  const [isShowHint, setIsShowHint] = useState()
  const [isShowAnswer, setIsShowAnswer] = useState()

  useEffect(() => {
    setIsShowAnswer(false)
    setIsShowHint(false)
  }, [question])

  useEffect(() => {
    const timerId = setTimeout(() => {
      setIsShowHint(true)
    }, 2000)
    return () => clearTimeout(timerId)
  }, [question])
  
  useEffect(() => {
    const timerId = setTimeout(() => {
      setIsShowAnswer(true)
    }, 4000)
    return () => clearTimeout(timerId)
  }, [question])

  useEffect(() => {
    let timerId
    if (isShowAnswer) {
      timerId = setTimeout(() => {
        onNext()
      }, 1000)
    }
    return () => clearTimeout(timerId)
  }, [isShowAnswer])

  const handleAnswerClick = (index) => {
    setSelectedAnswer(index)
  }

  return (
    <div className='question'>
      <h2>{question.question}</h2>
      {isShowHint && <p>{question.hint}</p>}
      <ul>
        {question.choices.map((choice, index) => (
          <li
            key={index}
            className={index === selectedAnswer ? 'selected' : ''}
            onClick={() => handleAnswerClick(index)}
          >
            {choice}
          </li>
        ))}
      </ul>
    </div>
  )
}

export default Question