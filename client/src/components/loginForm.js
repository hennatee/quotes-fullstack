
import React, { useState } from 'react'
import { setNotification } from '../reducers/notificationReducer'
import { login } from '../reducers/loginReducer'
import { useDispatch } from 'react-redux'
import { Notification } from './notification'


export const LoginForm = () => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  let dispatch = useDispatch()

  const handleLogin = event => {
    event.preventDefault()
    try {
      setEmail('')
      setPassword('')
      dispatch(login(email, password))
    } catch (exception) {
      setEmail('')
      setPassword('')
      dispatch(setNotification('Wrong email or password', 5))
    }
  }

  return (
    <div className="login-form">
    <h1>Log in to application</h1>
    <Notification />
      <form onSubmit={handleLogin}>
        <div>Email &nbsp;
        <input
            type="text"
            value={email}
            name="Email"
            onChange={({ target }) => setEmail(target.value)}
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