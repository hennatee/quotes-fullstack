
import React, { useState } from 'react'
import { setNotification } from '../reducers/notificationReducer'
import { login } from '../reducers/loginReducer'
import { useDispatch } from 'react-redux'
import { Notification } from './notification'


export const LoginForm = () => {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  let dispatch = useDispatch()

  const handleLogin = event => {
    event.preventDefault()
    try {
      setUsername('')
      setPassword('')
      dispatch(login(username, password))
    } catch (exception) {
      setUsername('')
      setPassword('')
      dispatch(setNotification('Wrong username or password', 5))
    }
  }

  return (
    <div className="login-form">
    <h1>Log in to application</h1>
    <Notification />
      <form onSubmit={handleLogin}>
        <div>Username &nbsp;
        <input
            type="text"
            value={username}
            name="Username"
            onChange={({ target }) => setUsername(target.value)}
          />
        </div>
        <div>Password &nbsp;
        <input
            type="password"
            value={password}
            name="Password"
            onChange={({ target }) => setPassword(target.value)}
          />
        </div>
        <div>
          <button type="submit">Log in</button>
        </div>
      </form>
    </div>
  )
}