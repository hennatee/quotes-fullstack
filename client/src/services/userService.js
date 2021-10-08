import axios from 'axios'

const usersURL = 'api/users'

export const userService = {
  getAll: async () => {
    const request = axios.get(usersURL)
    const response = await request
    return response.data
  }
}