//import { connection, connect, disconnect } from 'mongoose'
const mongoose = require('mongoose')
const logger = require('../utils/logger')
const dotenv = require('dotenv').config()

/**
 * Gets database connect URL from environment
 * variable
 *
 * @returns {string} connection URL
 */
const getDbUrl = () => {
  const url = process.env.DBURL;
  return url
}
/**
 * Connect to database
 */
const connectDB = () => {
  // Do nothing if already connected
  if (!mongoose.connection || mongoose.connection.readyState === 0) {
    mongoose.connect(getDbUrl(), {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        autoIndex: true
      })
      .then(() => {
        logger.info('Database connected')
        mongoose.connection.on('error', err => {
          logger.error(err)
        })
        mongoose.connection.on('reconnectFailed', handleCriticalError)
      })
      .catch(handleCriticalError)
  }
}
/**
 * Throws error and logs it to the console
 * 
 * @param {*} err Error
 * @throws Throws an error given as a parameter
 */
const handleCriticalError = err => {
  console.error(err)
  throw err
}

/**
 * Disconnect database
 */
const disconnectDB = () => {
  mongoose.disconnect()
}

module.exports = { connectDB, disconnectDB, getDbUrl }