// server.js
const express = require('express')
const cors = require('cors')
const app = express()
const port = 3001
const questionsModule = require('./questions')

app.use(cors())

app.get('/api/questions', (req, res) => {
  const randomQuestions = questionsModule.questions.slice(0, 5)
  res.json(randomQuestions)
})

app.listen(port, () => {
  console.log(`Server is running on port ${port}`)
})

