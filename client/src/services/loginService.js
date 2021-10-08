import axios from 'axios'

const loginURL = '/api/login'

export const loginService = {

  login: async credentials => {
    const response = await axios.post(loginURL, credentials)
    return response.data
  }

}