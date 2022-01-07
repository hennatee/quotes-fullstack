
const express = require('express')
const cors = require('cors')

const quotesRouter = require('./controllers/quotes')
const usersRouter = require('./controllers/users')
const loginRouter = require('./controllers/login')

const logger = require('./utils/logger')
const config = require('./utils/config')
const middleware = require('./utils/middleware')

const app = express()

app.use(cors())
app.use(express.json())
app.use(middleware.requestLogger)
app.use(middleware.tokenExtractor)

app.use('/api/quotes', quotesRouter)
app.use('/api/users', usersRouter)
app.use('/api/login', loginRouter)

app.use(middleware.unknownEndpoint)

module.exports = app