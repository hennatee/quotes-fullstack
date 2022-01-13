import axios from 'axios'

const quotesURL = '/api/quotes'
let token = null


export const quoteService = {

  setToken: newToken => {
    token = `bearer ${newToken}`
  },

  getAll: async () => {
    const response = await axios.get(quotesURL)
    return response.data
  },

  create: async newObject => {
    const config = {
      headers: { Authorization: token }
    }
    try {
      const response = await axios.post(quotesURL, newObject, config)
      return response.data
    } catch (error) {
      console.error(error)
    }
  },

  update: async (id, newObject) => {
    const config = {
      headers: { Authorization: token }
    }
    try {
      const response = await axios.put(`${quotesURL}/${id}`, newObject, config)
      return response.data
    } catch (error) {
      console.error(error)
    }
  },

  remove: async id => {
    const config = {
      headers: { Authorization: token }
    }
    try {
      const response = await axios.delete(`${quotesURL}/${id}`, config)
      return response.data
    } catch (error) {
      console.error(error)
    }
  }  

}

