import { addStars, removeReason } from '../reducers/reducer-reason'
import { setNotification } from '../reducers/reducer-notification'
import { useDispatch } from 'react-redux'
import Icon from '@mdi/react'
import { mdiStar } from '@mdi/js';
//import { useParams } from 'react-router-dom'

export const Reason = ({reason}) => {
   
    let dispatch = useDispatch()
  
    const addStarsForReason = reason => {
      dispatch(addStars(reason))
    }
  
    const reasonToRemove = reason => {
      dispatch(removeReason(reason))
      dispatch(setNotification(`Reason ${reason.title} removed`, 5))
    }
    
  
    return (
      <div className="reason" >
          <h2>{reason.title}</h2>
          <p>{reason.description}</p>
          <div className="stars">
            <Icon path={mdiStar}
            title={reason.stars}
            size={1} /> {reason.stars}
          </div>
          <button className="add-stars-button" onClick={() => addStarsForReason(reason)}>Add stars</button> <br />
          <button className="remove-button" onClick={() => reasonToRemove(reason)}>Remove</button>
      </div>
      )
  }