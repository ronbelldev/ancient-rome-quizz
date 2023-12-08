"use client"
import React, { useState } from 'react'
import toast, { Toaster } from 'react-hot-toast'
import Question from './Question'
import "./index.scss"
import "./styles.css"
import Button from './components/Button'
const START_GAME = 0

const Home = () => {
  const [currentQuestion, setCurrentQuestion] = useState(0)
  const [questions, setQuestions] = useState([])
  const [totalScore, setTotalScore] = useState(0)

  const isGameEnded = currentQuestion === questions.length + 1

  const onClickStart = () => {
    fetch('http://localhost:3001/api/questions')
      .then(res => res.json())
      .then(data =>  {
        setQuestions(data)
        setCurrentQuestion(currentQuestion + 1)
      })
  }

  const onClickRestart = () => {
      setCurrentQuestion(0)
      setTotalScore(0)
  }
  const onNext = () => {
      setCurrentQuestion(currentQuestion + 1)
  }

  const increaseScore = () => {
      setTotalScore(totalScore + 1)
      onNext()
  }

  return (
    <div className='home'>
      <Toaster />
      {currentQuestion === START_GAME
        ? <Button onClick={onClickStart} text={'Start Quiz'} />
        : isGameEnded
          ? (<div className='results-wrapper'>
                  <div className='results'>Your score is: {totalScore}!</div>
                  <Button
                      className='restart-button'
                      onClick={onClickRestart}
                      text='Restart'
                  />
              </div>)
          : (<Question
              question={questions[currentQuestion - 1]}
              onNext={onNext}
              onShowHint={hint => toast.success(hint, { icon: '💡' })}
              increaseScore={increaseScore}
            />)
      }

    </div>
  )
}

export default Home
