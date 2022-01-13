const http = require('http')
const User = require("../models/user")
const responseUtils = require('../utils/response')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')

/**
 * Check login credentials and send logged in user back
 * as JSON with jsonwebtoken
 *
 * @param {http.ServerResponse} response server response
 * @param {object} userData JSON data from request body
 * @returns {void} 
 */
const loginUser = async (response, userData) => {
  //Find user from database
  const foundUser = await User.findOne({ email: userData.email }).exec()
  if (!foundUser) {
    return responseUtils.notFound(response)
  } 

  if (correctPassword(userData.password, foundUser)) {
    const userForToken = {
      name: foundUser.name,
      email: foundUser.email,
      id: foundUser.id,
    }
    const token = jwt.sign(userForToken, process.env.SECRET)
    return responseUtils.sendJson(response, {token, ...userForToken})
  }
  return responseUtils.badRequest(response, 'Invalid email or password')
}

/**
 * Compare supplied password with user's own (hashed) password
 *
 * @param {string} password password from request body
 * @param {Object} user mongoose object
 * @returns {Promise<boolean>} promise that resolves to the comparison result
 */
const correctPassword = async (password, user) => {
  try {
    const correct = await bcrypt.compare(password, user.password)
    return correct
  } catch (error) {
    console.error(error)
  }
}  

module.exports = { loginUser }