import React, { useState, useEffect } from 'react'
const Question = ({ question, userAnswer }) => {
  const [selectedAnswer, setSelectedAnswer] = useState(null)

  useEffect(() => {
    setSelectedAnswer(userAnswer)
  }, [userAnswer])

  const handleAnswerClick = (index) => {
    setSelectedAnswer(index)
  }

  return (
    <div className='question'>
      <h2>{question.question}</h2>
      <p>{question.hint}</p>
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