import { createStore, applyMiddleware } from 'redux'
import thunk from 'redux-thunk'
import { composeWithDevTools } from 'redux-devtools-extension/developmentOnly'
import { persistStore } from 'redux-persist'
import { rootReducer } from './reducers/rootReducer'


export const store = createStore(rootReducer, composeWithDevTools(applyMiddleware(thunk)))

export const persistor = persistStore(store)