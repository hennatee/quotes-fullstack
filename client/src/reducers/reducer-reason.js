import { reasonService } from "../services/reasonService"

const reducer = (state = [], action) => {
  switch (action.type) {
    case 'NEW_REASON': {
      return state.concat(action.data)
    }
    case 'ADD_STARS': {
      const likedReason = action.data
      return state.map(reason => 
        reason.id !== likedReason.id ? reason : likedReason
      )
    }
    case 'REMOVE': {
      const removedReason = action.data
      return state.filter(reason => 
        reason.id !== removedReason.id
      )
    }
    case 'INIT_REASONS': {
      return action.data
    }
    default: return state
  }
}

export const initializeReasons = () => {
  return async dispatch => {
    const reasons = await reasonService.getAll()
    dispatch({
      type: 'INIT_REASONS',
      data: reasons,
    })
  }
}

export const createReason = reason => {
  return async dispatch => {
    const newReason = await reasonService.create(reason)
    dispatch({
      type: 'NEW_REASON',
      data: newReason,
    })
  }
} 

export const addStars = reason => {
  const updatedReason = {...reason, stars: reason.stars + 1}
  return async dispatch => {
    const reasonWithStars = await reasonService.update(reason.id, updatedReason)
    dispatch({
      type: 'ADD_STARS',
      data: reasonWithStars,
    })
  }
} 

export const removeReason = reason => {
  return async dispatch => {
    await reasonService.remove(reason.id)
    dispatch({
      type: 'REMOVE',
      data: reason,
    })
  }
}

export default reducer

