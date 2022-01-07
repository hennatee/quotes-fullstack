import { quoteService } from "../services/quoteService"

const reducer = (state = [], action) => {
  switch (action.type) {
    case 'NEW_QUOTE': {
      return state.concat(action.data)
    }
    case 'ADD_LIKES': {
      const likedQuote = action.data
      return state.map(quote => 
        quote.id !== likedQuote.id ? quote : likedQuote
      )
    }
    case 'REMOVE': {
      const removedQuote = action.data
      return state.filter(reason => 
        reason.id !== removedQuote.id
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
    const newQuote = await quoteService.create(quote)
    dispatch({
      type: 'NEW_QUOTE',
      data: newQuote,
    })
  }
} 

export const addLikes = quote => {
  const updatedQuote = {...quote, likes: quote.likes + 1}
  return async dispatch => {
    const likedQuote = await quoteService.update(quote.id, updatedQuote)
    dispatch({
      type: 'ADD_LIKES',
      data: likedQuote,
    })
  }
} 

export const removeQuote = quote => {
  return async dispatch => {
    await quoteService.remove(quote.id)
    dispatch({
      type: 'REMOVE',
      data: quote,
    })
  }
}

export default reducer

