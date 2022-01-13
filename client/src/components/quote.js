import { addLikes, removeQuote } from '../reducers/quoteReducer'
import { setNotification } from '../reducers/notificationReducer'
import { useSelector, useDispatch } from 'react-redux'
import Icon from '@mdi/react'
import { mdiThumbUp } from '@mdi/js'
import { mdiTrashCanOutline } from '@mdi/js'

export const Quote = ({quote}) => {
   
    const dispatch = useDispatch()
    const loginUser = useSelector(state => state.loginUser)
  
    const addLikesForQuote = quote => {
      dispatch(addLikes(quote))
    }
  
    const quoteToRemove = quote => {
      dispatch(removeQuote(quote))
      dispatch(setNotification(`Quote ${quote.description} removed`, 5))
    }

    /**
     * Used for checking if logged in user has created the quote.
     * Remove-button is visible only if so.
     * 
     * @returns {boolean} True if logged in user has created the quote
     */
    const createdByLoggedInUser = () => {
      if (loginUser.id === quote.userId) return true
      return false
    }

    return (
      <div className="quote" >
        <h2>{quote.author}</h2>
        <p>"{quote.description}"</p>
        <div className="likes">
          <Icon path={mdiThumbUp} 
          title={quote.likes}
          size={1} /> {quote.likes}
        </div>
        <button 
          className="add-likes-button" 
          onClick={() => addLikesForQuote(quote)}>
          Like
        </button><br/>
        {createdByLoggedInUser() &&
          <button 
            className="remove-button" 
            onClick={() => quoteToRemove(quote)}>
            <Icon path={mdiTrashCanOutline} size={1}/>
          </button>}
      </div>
    )
  }