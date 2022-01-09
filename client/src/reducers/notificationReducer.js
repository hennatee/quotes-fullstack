
const reducer = (state = '', action) => {
    switch (action.type) {
      case 'NOTIFICATION': {
        state = action.data  
        return state
      }
      case 'EMPTY' : {
        state = ''  
        return state
      }
      default: return state 
    }
  }  

  export const setNotification = (content, time) => {
    
    return async dispatch => {
      await dispatch({
        type: 'NOTIFICATION',
        data: content,
      })
      setTimeout(() => {
        dispatch({ type: 'EMPTY' })
      }, time*1000)
    }
  }  

  export default reducer
