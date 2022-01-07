const jwt = require('jsonwebtoken')
const quotesRouter = require('express').Router()
const axios = require('axios')

const quotesURL = 'http://localhost:3004/quotes'
const usersURL = 'http://localhost:3004/users'

quotesRouter.get('/', async (request, response) => {
    const res = await axios.get(`${quotesURL}?_expand=user`)
    response.json(res.data)
})

quotesRouter.post('/', async (request, response, next) => {
    try {
        const { token } = request
        let decodedToken

        try {
            decodedToken = jwt.verify(token, process.env.SECRET)
        } catch (error) {
            console.log(error)
        } 

        if (!token || !decodedToken.id) {
            return response.status(401).json({ error: 'token missing or invalid' })
        }

        const userRes = await axios.get(`${usersURL}?id=${decodedToken.id}`);
        const user = userRes.data[0];

        if (!user || user.username !== decodedToken.username) {
            return response.status(401).json({ error: 'user missing or invalid' })
        }

        const { author, description } = request.body

        const quote = {
            author: author,
            description: description,
            likes: 0,
            userId: user.id
        }

        const { data: savedQuote } = await axios.post(quotesURL, quote)

        response.status(201).json({...savedQuote, user})

    } catch (error) {
        next(error)
    }
})

quotesRouter.delete('/:id', async (request, response, next) => {
    try {
        const { token } = request
        const { id } = request.params;
        let decodedToken

        try {
            decodedToken = jwt.verify(token, process.env.SECRET)
        } catch (error) {
            console.log(error)
        }

        if (!token || !decodedToken.id) {
            return response.status(401).json({ error: 'token missing or invalid' })
        }

        const { data: quote, status: getStatus } = await axios.get(`${quotesURL}/${id}`)

        if (getStatus !== 200) {
            return response.status(401).json({ error: 'unauthorized user' })
        }

        if (!decodedToken.id || quote.userId !== decodedToken.id) {
            return response.status(401).json({ error: 'unauthorized user' })
        }

        const { status: deleteStatus } = await axios.delete(`${quotesURL}/${id}`);
        response.status(deleteStatus === 200 ? 204 : deleteStatus).end();

    } catch (error) {
        next(error)
    }
})

quotesRouter.put('/:id', async (request, response, next) => {
    const { id } = request.params
    const { likes } = request.body
  
    try {
        await axios.patch(`${quotesURL}/${id}`, { likes })
        response.json(request.body)
    } catch (error) { 
        next(error) 
    }
})

module.exports = quotesRouter