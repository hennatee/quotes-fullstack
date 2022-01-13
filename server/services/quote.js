const http = require('http')
const Quote = require('../models/quote')
const User = require('../models/user')
const responseUtils = require('../utils/response')
const jwt = require('jsonwebtoken')

/**
 * Get all quotes from database and send them back as JSON
 *
 * @param {http.ServerResponse} response server response
 * @param {object} quoteData JSON data from request body
 * @returns {void} 
 */
const getAllQuotes = async response => {
  try {
    const quotes = await Quote.find({})
    return responseUtils.sendJson(response, quotes)
  }
  catch (error) {
    return responseUtils.notFound(response)
  }
}

/**
 * Create new quote to database and send it back as JSON
 *
 * @param {http.ClientRequest} request client request
 * @param {http.ServerResponse} response server response
 * @returns {void} 
 */
const createQuote = async (request, response) => {
  const { token } = request
  let decodedToken

  try {
    //extract jsonwebtoken from request and check that it is valid
    decodedToken = jwt.verify(token, process.env.SECRET)
    if (!token || !decodedToken.id) {
      return responseUtils.badRequest(response, 'Token missing or invalid')
    }

    const user = await User.findById(decodedToken.id)
    if (!user) {
      return responseUtils.badRequest(response, 'User missing or invalid')
    }

    const { author, description } = request.body
    const quote = {
        author: author,
        description: description,
        likes: 0,
        userId: user.id
    }
  
    const newQuote = new Quote(quote)
    await newQuote.save()
    const createdQuote = await Quote.findOne({ description: quote.description }).exec()
    return responseUtils.createdResource(response, createdQuote)
  } catch (error) {
    console.error(error)
    return responseUtils.badRequest(response, 'Quote information missing')
  }
}

/**
 * Updates quote's likes in database and sends updated 
 * object back as JSON
 * 
 * @param {http.ClientRequest} request 
 * @param {http.ServerResponse} response 
 * @returns {void}
 */
const addLikesForQuote = async (request, response) => {
  const { id } = request.params
  const { likes } = request.body
  
  //find quote to be updated
  const quote = await Quote.findById(id).exec()
  if (!quote) return responseUtils.notFound(response)

  try {
    if (likes) quote.likes = likes
    await quote.save()
    const updatedQuote = await Quote.findById(id).exec()
    return responseUtils.sendJson(response, updatedQuote)
  } catch (error) { 
    return responseUtils.badRequest(response, error)
  }
}

/**
 * Removes quote from database and sends removed object back
 * as JSON
 * 
 * @param {http.ClientRequest} request 
 * @param {http.ServerResponse} response 
 * @returns {void}
 */
const removeQuote = async (request, response) => {
  const { token } = request
  const { id } = request.params
  let decodedToken

  try {
    //extract jsonwebtoken from request and check that it is valid
    decodedToken = jwt.verify(token, process.env.SECRET)
    if (!token || !decodedToken.id) {
      return responseUtils.badRequest(response, 'Token missing or invalid')
    }

    const user = await User.findById(decodedToken.id)
    if (!user) {
      return responseUtils.badRequest(response, 'User missing or invalid')
    }

    //find quote from database
    const quote = await Quote.findById(id).exec()
    if (!quote) return responseUtils.notFound(response)

    //verify that user is the creator of the quote 
    if (quote.userId !== decodedToken.id) {
      return responseUtils.unauthorized(response)
    }

    await Quote.deleteOne({ _id: id})
    return responseUtils.sendJson(response, quote)
  } catch (error) {
    return responseUtils.badRequest(response, error)
  }
}
module.exports = { getAllQuotes, createQuote, addLikesForQuote, removeQuote }