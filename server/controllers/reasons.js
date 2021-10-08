const jwt = require('jsonwebtoken')
const reasonsRouter = require('express').Router()
const axios = require('axios')

const reasonsURL = 'http://localhost:3004/reasons'
const usersURL = 'http://localhost:3004/users'

reasonsRouter.get('/', async (request, response) => {
    const res = await axios.get(`${reasonsURL}?_expand=user`)
    response.json(res.data)
})

reasonsRouter.post('/', async (request, response, next) => {
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

        const { title, description } = request.body

        const reason = {
            title: title,
            description: description,
            stars: 0,
            userId: user.id
        }

        const { data: savedReason } = await axios.post(reasonsURL, reason)

        response.status(201).json({...savedReason, user})

    } catch (error) {
        next(error)
    }
})

reasonsRouter.delete('/:id', async (request, response, next) => {
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

        const { data: reason, status: getStatus } = await axios.get(`${reasonsURL}/${id}`)

        if (getStatus !== 200) {
            return response.status(401).json({ error: 'unauthorized user' })
        }

        if (!decodedToken.id || reason.userId !== decodedToken.id) {
            return response.status(401).json({ error: 'unauthorized user' })
        }

        const { status: deleteStatus } = await axios.delete(`${reasonsURL}/${id}`);
        response.status(deleteStatus === 200 ? 204 : deleteStatus).end();

    } catch (error) {
        next(error)
    }
})

reasonsRouter.put('/:id', async (request, response, next) => {
    const { id } = request.params
    const { stars } = request.body
  
    try {
        await axios.patch(`${reasonsURL}/${id}`, { stars })
        response.json(request.body)
    } catch (error) { 
        next(error) 
    }
})

module.exports = reasonsRouter