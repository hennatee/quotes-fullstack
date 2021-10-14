import React, { useEffect } from 'react'
import { initializeReasons } from '../reducers/reducer-reason'
import { useSelector, useDispatch } from 'react-redux'
import { ReasonForm } from './reasonForm'
import { Reason } from './reason'
import { Notification } from './notification'


export const ReasonList = () => {

    let dispatch = useDispatch()
  
    useEffect(() => {
      dispatch(initializeReasons())
    }, [dispatch])
  
    const currentUser = useSelector(state => state.loginUser)
    const reasons = useSelector(state => state.reasons)
  
    //show only users own reasons sorted by amount of given stars
    const ownReasons = reasons ? reasons.filter(reason => reason.userId === currentUser.id) : []
    const reasonsToShow = ownReasons.sort((a, b) => (b.stars - a.stars))
  
    return (
      <div className="reason-list">
        <h1>Why Futurice?</h1>
        <Notification/>  
        <ReasonForm />
        {reasonsToShow.map(reason =>
            <Reason key={reason.id} reason={reason}/>
          )}
      </div>
    )
  }

  //<Link key={reason.id} to={`/reasons/${reason.id}`}>{reason.title}</Link>
