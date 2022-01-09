import React, { useEffect} from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { HomePage } from './pages/homePage'
import { loggedIn } from './reducers/loginReducer'
import {
  BrowserRouter as Router,
  Switch, 
  Route
} from 'react-router-dom'

export const App = () => {

  let dispatch = useDispatch()
  
    useEffect(() => {
      const loggedUserJSON = window.localStorage.getItem('loggedQuoteAppUser')
      if (loggedUserJSON) {
        const user = JSON.parse(loggedUserJSON)
        dispatch(loggedIn(user))
      }
    }, [dispatch] )

  const user = useSelector(state => state.loginUser)

  return (
    <Router>
      <Switch>
        <Route path="/">
          <HomePage user={user}/>
        </Route>
      </Switch>
    </Router>
  )
}

//multiple routes can be added to router later
//for example:
//<Route path="/users/:id">

 