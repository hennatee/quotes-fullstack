const jwt = require('jsonwebtoken')
const quotesRouter = require('express').Router()
const quoteService = require('../services/quote')

const quotesURL = 'http://localhost:3004/quotes'
const usersURL = 'http://localhost:3004/users'

/** Get all quotes */
quotesRouter.get('/', (request, response) => {
  try {
    quoteService.getAllQuotes(response)
  } catch (error) {
    console.error(error)
  }
})

/** Create new quote */
quotesRouter.post('/', (request, response, next) => {
  try {
    quoteService.createQuote(request, response)
  } catch (error) {
    next(error)
  }
})

/** Delete quote by id */
quotesRouter.delete('/:id', async (request, response, next) => {
  try {
    quoteService.removeQuote(request, response)
  } catch (error) {
    next(error)
  }
})

/** Update quote by id (add likes) */
quotesRouter.put('/:id', (request, response, next) => {
  try {
    quoteService.addLikesForQuote(request, response)
  } catch (error) {
    console.error(error)
    next(error)
  }
})

module.exports = quotesRouter