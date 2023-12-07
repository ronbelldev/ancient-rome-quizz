"use client"
// Quiz.js
import React, { useState, useEffect } from 'react'
import Question from './Question'
import "./index.scss"
import "./styles.css"
import Button from './components/Button'

const START_GAME = 0

const Home = () => {
  const [currentQuestion, setCurrentQuestion] = useState(0)
  const [questions, setQuestions] = useState([])
  const isGameEnded = currentQuestion === questions.length + 1

  useEffect(() => {
    if (currentQuestion < questions.length) {
      const timer = setTimeout(() => {
        setCurrentQuestion((prev) => prev + 1);
      }, 10000)

      return () => clearTimeout(timer);
    }
  }, [currentQuestion]);

  const onClickStart = () => {
    fetch('http://localhost:3001/api/questions')
      .then(res => res.json())
      .then(data =>  {
        setQuestions(data)
        setCurrentQuestion(currentQuestion + 1)
      })
  }

  const onClickNext = () => {
      setCurrentQuestion(currentQuestion + 1)
  }

  return (
    <div>
      {currentQuestion === START_GAME
        ? <Button onClick={onClickStart} text={'start'} />
        : isGameEnded
          ? <div onClick={() => setCurrentQuestion(0)}>Results</div>
          : <Question question={questions[currentQuestion - 1]} onNext={onClickNext} />
      }

    </div>
  )
}

export default Home