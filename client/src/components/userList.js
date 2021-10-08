
import React, { useEffect } from 'react'
import { initializeUsers } from '../reducers/reducer-user'
import { useSelector, useDispatch } from 'react-redux'
import { Link } from 'react-router-dom'

//up-coming feature:
//display list of all users and number of reasons they have added
export const UserList = () => {

  let dispatch = useDispatch()

  useEffect(() => {
    dispatch(initializeUsers())
  }, [dispatch])

  const users = useSelector(state => state.users)

  return (
    <>
    <h1>Users</h1>
    <table>
      <tbody>
        <tr>
            <th>Name</th>
            <th>Number of reasons</th>
        </tr>
        {users.map(user => 
        <tr key={user.id}>
            <td><Link to={`/users/${user.id}`}>{user.name}</Link></td>
            <td>{user.reasons.length}</td>
        </tr>
        )}
      </tbody>
    </table>
    </>
  )
}
