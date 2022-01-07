import { addLikes, removeQuote } from '../reducers/reducer-quote'
import { setNotification } from '../reducers/reducer-notification'
import { useDispatch } from 'react-redux'
import Icon from '@mdi/react'
import { mdiThumbUp } from '@mdi/js';

export const Quote = ({quote}) => {
   
    let dispatch = useDispatch()
  
    const addLikesForQuote = quote => {
      dispatch(addLikes(quote))
    }
  
    const quoteToRemove = quote => {
      dispatch(removeQuote(quote))
      dispatch(setNotification(`Quote ${quote.description} removed`, 5))
    }
    
  
    return (
      <div className="reason" >
          <h2>{quote.author}</h2>
          <p>{quote.description}</p>
          <div className="stars">
            <Icon path={mdiThumbUp}
            title={quote.likes}
            size={1} /> {quote.likes}
          </div>
          <button className="add-likes-button" onClick={() => addLikesForQuote(quote)}>Like</button> <br />
          <button className="remove-button" onClick={() => quoteToRemove(quote)}>Delete</button>
      </div>
      )
  }