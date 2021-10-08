import axios from 'axios'

const reasonsURL = '/api/reasons'
let token = null


export const reasonService = {

  setToken: newToken => {
    token = `bearer ${newToken}`
    console.log("token set", token)
  },

  getAll: async () => {
    const response = await axios.get(reasonsURL)
    return response.data
  },

  create: async newObject => {
    const config = {
      headers: { Authorization: token },
    }
    const response = await axios.post(reasonsURL, newObject, config)
    return response.data
  },

  update: async (id, newObject) => {
    const config = {
      headers: { Authorization: token },
    }
    const response = await axios.put(`${reasonsURL}/${id}`, newObject, config)
    return response.data
  },

  remove: id => {
    const config = {
      headers: { Authorization: token },
    }
    return axios.delete(`${reasonsURL}/${id}`, config)
  }

}

