import { combineReducers } from 'redux'
import { persistReducer } from "redux-persist"
import storage from "redux-persist/lib/storage"
import notificationReducer from './notificationReducer'
import quoteReducer from './quoteReducer'
import loginReducer from './loginReducer'
import userReducer from './userReducer'

const reducer = combineReducers({
  notification: notificationReducer,
  quotes: quoteReducer,
  loginUser: loginReducer,
  users: userReducer
})

const persistConfiguration = {
  key: "root",
  storage,
  whitelist: ["quotes", "loginUser", "users"]
}

export const rootReducer = persistReducer(persistConfiguration, reducer)