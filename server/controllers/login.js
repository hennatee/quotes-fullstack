const loginRouter = require('express').Router()
const loginService = require('../services/login')

// Log in 
loginRouter.post('/', async (request, response) => {
  try {
    const userData = request.body
    loginService.loginUser(response, userData)
  }
  catch (error) { 
    console.error(error)
  }
})

module.exports = loginRouter