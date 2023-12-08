import React, { useState, useEffect } from 'react'
import Button from '@/app/components/Button'
import './index.scss'

const Question = ({ question, onNext, onShowHint, increaseScore }) => {
  const [selectedAnswer, setSelectedAnswer] = useState()
  const [isShowAnswer, setIsShowAnswer] = useState()

  useEffect(() => {
    setIsShowAnswer(false)
    setSelectedAnswer()
  }, [question])

  useEffect(() => {
    const timerId = setTimeout(() => {
        onShowHint(question.hint)
    }, 10000)
    return () => clearTimeout(timerId)
  }, [question])

  useEffect(() => {
    const timerId = setTimeout(() => {
      setIsShowAnswer(true)
    }, 20000)
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
    if (index === question.answer_index) {
      increaseScore()
    }
  }

  return (
      <div className='question-wrapper'>
        <div className='question'>
          <div className='question-title'>{question.question}</div>
          <ul>
            {question.choices.map((choice, index) => (
              <li
                key={index}
                className={index === selectedAnswer && !isShowAnswer
                    ? 'selected'
                    : isShowAnswer && index === question.answer_index
                      ? 'correct'
                        : index === selectedAnswer
                        ? 'wrong'
                        : ''}
                onClick={() => handleAnswerClick(index)}
              >
                {choice}
              </li>
            ))}
          </ul>
        </div>
        <Button
            isDisabled={selectedAnswer === undefined}
            text='Next'
            onClick={() => setIsShowAnswer(true)}
        />
      </div>
  )
}

export default Question
