import React, { useState, useEffect } from 'react'
import './index.scss'

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
      <div className='question-title'>{question.question}</div>
      {isShowHint && <p>{question.hint}</p>}
      <ul>
        {question.choices.map((choice, index) => (
          <li
            key={index}
            className={isShowAnswer && index === question.answer_index ? 'selected' : ''}
            onClick={() => onNext() || handleAnswerClick(index)}
          >
            {choice}
          </li>
        ))}
      </ul>
    </div>
  )
}

export default Question
