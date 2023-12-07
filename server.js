// server.js
const express = require('express')
const cors = require('cors')
const app = express()
const port = 3001
const questionsModule = require('./questions')

app.use(cors())

app.get('/api/questions', (req, res) => {
  const questions= questionsModule.questions
  let randomIndexesOfQuestions = []
  let questionsToAsk = [];

  const choose = () => {
    let randomIndex = Math.round(Math.random() * (questions.length - 1))

    if (!randomIndexesOfQuestions.includes(randomIndex)) {
      randomIndexesOfQuestions.push(randomIndex)
    }

    if (randomIndexesOfQuestions.length === 5) {
      questionsToAsk = randomIndexesOfQuestions.map(indexOfQuestion => questions[indexOfQuestion])
    } else {
      choose()
    }
  }
  choose()
  res.json(questionsToAsk)
})

app.listen(port, () => {
  console.log(`Server is running on port ${port}`)
})

