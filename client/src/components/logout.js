
import React from 'react'
import { logoutUser } from '../reducers/loginReducer'
import { useSelector, useDispatch } from 'react-redux'


export const Logout = () => {

  const user = useSelector(state => state.loginUser)
  let dispatch = useDispatch()

  const handleLogout = () => {
    dispatch(logoutUser())
  }

  return (
    <div className="logout-container">
        <div className="logout">
            {user.name} logged in &nbsp;
            <button type="button" onClick={handleLogout}>Logout</button>
        </div>
    </div>
  )
}