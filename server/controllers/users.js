const userRouter = require('express').Router()
const axios = require('axios');
const bcrypt = require('bcrypt')
const userService = require('../services/user')

// Register new user
userRouter.post('/', async (request, response, next) => {
    console.log('in correct router')
    try {
        const body = request.body
        
        const user = {
            name: body.name,
            email: body.email,
            password: body.password
        }
        userService.registerUser(response, user)

    }
    catch (error) { 
        console.log(error)
        next(error) 
    }
})

module.exports = userRouter