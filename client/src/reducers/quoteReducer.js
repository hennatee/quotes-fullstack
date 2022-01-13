import { quoteService } from "../services/quoteService"

const reducer = (state = [], action) => {
  switch (action.type) {
    case 'NEW_QUOTE': {
      return state.concat(action.data)
    }
    case 'ADD_LIKES': {
      const likedQuote = action.data
      return state.map(quote => 
        quote._id !== likedQuote._id ? quote : likedQuote
      )
    }
    case 'REMOVE': {
      const removedQuote = action.data
      return state.filter(quote => 
        quote._id !== removedQuote._id
      )
    }
    case 'INIT_QUOTES': {
      return action.data
    }
    default: return state
  }
}

export const initializeQuotes = () => {
  return async dispatch => {
    const quotes = await quoteService.getAll()
    dispatch({
      type: 'INIT_QUOTES',
      data: quotes,
    })
  }
}

export const createQuote = quote => {
  return async dispatch => {
    try {
      const newQuote = await quoteService.create(quote)
      dispatch({
        type: 'NEW_QUOTE',
        data: newQuote,
      })
    } catch (error) {
      console.error(error)
    }
  }
} 

export const addLikes = quote => {
  const updatedQuote = {...quote, likes: quote.likes + 1}
  return async dispatch => {
    const likedQuote = await quoteService.update(quote._id, updatedQuote)
    dispatch({
      type: 'ADD_LIKES',
      data: likedQuote,
    })
  }
} 

export const removeQuote = quote => {
  return async dispatch => {
    try {
      const removedQuote = await quoteService.remove(quote._id)
      dispatch({
        type: 'REMOVE',
        data: removedQuote,
      })
    } catch (error) {
      console.error(error)
    }
  }
}

export default reducer

