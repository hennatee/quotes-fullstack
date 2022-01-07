import { createStore, applyMiddleware, combineReducers } from 'redux'
import thunk from 'redux-thunk'
import { composeWithDevTools } from 'redux-devtools-extension/developmentOnly'
import { persistStore, persistReducer } from 'redux-persist'
import storage from "redux-persist/lib/storage"
import notificationReducer from './reducers/reducer-notification'
import quoteReducer from './reducers/reducer-quote'
import loginReducer from './reducers/reducer-login'
import userReducer from './reducers/reducer-user'

const combined = combineReducers({
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

const reducer = persistReducer(persistConfiguration, combined)

export const store = createStore(reducer, composeWithDevTools(applyMiddleware(thunk)))

export const persistor = persistStore(store)