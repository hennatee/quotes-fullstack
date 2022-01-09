import { loginService } from '../services/loginService'
import {quoteService } from '../services/quoteService'
import { setNotification } from './notificationReducer'

const reducer = (state = null, action) => {
  switch (action.type) {
    case 'LOGIN_USER': {
      state = action.data
      return state
    }
    case 'LOGGED_USER': {
      state = action.data
      return state
    }
    case 'LOGOUT_USER': {
      state = null
      return state
    }
    default: return state
  }
}

export const login = (username, password) => {
  const credentials = {username, password}
  return async dispatch => {
    try {
      const user = await loginService.login(credentials)
      quoteService.setToken(user.token)

      window.localStorage.setItem(
        'loggedQuoteAppUser', JSON.stringify(user)
      )
      dispatch({
        type: 'LOGIN_USER',
        data: user,
      })
    } catch (error) {
      dispatch(setNotification('Wrong username or password', 5))
      console.error(error)
    }
    
  }
}

export const loggedIn = user => {
  return dispatch => {
    quoteService.setToken(user.token)
    dispatch({
      type: 'LOGGED_USER',
      data: user,
    })
  }
}

export const logoutUser = () => {
  return dispatch => {
    window.localStorage.removeItem('loggedQuoteAppUser')
    dispatch({
      type: 'LOGOUT_USER',
    })
  }
}

export default reducer

