import { createStore, applyMiddleware, combineReducers } from 'redux'
import thunk from 'redux-thunk'

import notificationReducer from './reducers/reducer-notification'
import quoteReducer from './reducers/reducer-quote'
import loginReducer from './reducers/reducer-login'
import userReducer from './reducers/reducer-user'

const reducer = combineReducers({
  notification: notificationReducer,
  quotes: quoteReducer,
  loginUser: loginReducer,
  users: userReducer
})

const store = createStore(reducer, applyMiddleware(thunk))

export default store