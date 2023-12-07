import React, { useState, useEffect } from 'react'
import './index.scss'

const Question = ({ question, onNext, onShowHint }) => {
  const [selectedAnswer, setSelectedAnswer] = useState()
  const [isShowHint, setIsShowHint] = useState()
  const [isShowAnswer, setIsShowAnswer] = useState()

  useEffect(() => {
    setIsShowAnswer(false)
    setIsShowHint(false)
    setSelectedAnswer()
  }, [question])

  useEffect(() => {
    const timerId = setTimeout(() => {
      if (!selectedAnswer) {
        onShowHint(question.hint)
        setIsShowHint(true)
      }
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
      <div className='question-title'>{question.question}</div>
      {isShowHint && <p>{question.hint}</p>}
      <ul>
        {question.choices.map((choice, index) => (
          <li
            key={index}
            className={(isShowAnswer || index === selectedAnswer) && index === question.answer_index
                ? 'correct'
                :  index === selectedAnswer
                    ? 'wrong'
                    : ''}
            onClick={() => (!selectedAnswer && selectedAnswer !== 0) && handleAnswerClick(index)}
          >
            {choice}
          </li>
        ))}
      </ul>
    </div>
  )
}

export default Question
