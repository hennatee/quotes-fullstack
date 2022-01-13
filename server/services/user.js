const http = require('http')
const User = require("../models/user")
const responseUtils = require('../utils/response')

/**
 * Register new user and send created user back as JSON
 *
 * @param {http.ServerResponse} response server response
 * @param {object} userData JSON data from request body
 * @returns {void} 
 */
const registerUser = async (response, userData) => {
  //Check that email is not already in use
  const findUser = await User.findOne({ email: userData.email }).exec()
  if (findUser !== null) {
    return responseUtils.badRequest(response, 'Email already in use')
  } 

  validatePassword(response, userData.password)
  //Continue if password is valid
  userData.role = 'user'
  const newUser = new User(userData)
  try {
    await newUser.save()
    const createdUser = await User.findOne({ email: userData.email }).exec()
    return responseUtils.createdResource(response, createdUser)
  }
  catch (error) {
    return responseUtils.badRequest(response, 'User information missing')
  }
}

/**
 * Validate password from request body
 *
 * @param {http.ServerResponse} response server response
 * @param {string} password password from request body
 * @returns {void} 
 */
const validatePassword = (response, password) => {
  if (!password) {
    return responseUtils.badRequest(response, 'Path `password` is required')
  }
  if (password.length < 8) {
    return responseUtils.badRequest(response, 'Path `password` is shorter than minimum allowed length (8)')
  }
}


module.exports = { registerUser }