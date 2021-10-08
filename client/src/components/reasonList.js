import React, { useEffect } from 'react'
import { initializeReasons } from '../reducers/reducer-reason'
import { useSelector, useDispatch } from 'react-redux'
import { ReasonForm } from './reasonForm'
import { Reason } from './reason'
import { Notification } from './notification'


export const ReasonList = () => {
/*
    const reasonListStyle = {
      display: 'flex',
      flexDirection: 'column'
    }
  */
    let dispatch = useDispatch()
  
    useEffect(() => {
      dispatch(initializeReasons())
    }, [dispatch])
  
    const currentUser = useSelector(state => state.loginUser)
  
    //show only users own reasons sorted by amount of given stars
    const reasons = useSelector(state => state.reasons)
    const ownReasons = reasons ? reasons.filter(reason => reason.user === currentUser) : []
    const reasonsToShow = ownReasons ? reasons.sort((a, b) => (b.stars - a.stars)) : []
  
    return (
      <div className="reason-list">
        <h1>Why Futurice?</h1>
        <p>Reasons why I think I should work at Futurice.</p>
        <Notification/>  
        <ReasonForm />
        {reasonsToShow.map(reason =>
            <Reason key={reason.id} reason={reason}/>
        )}
      </div>
    )
  }

  //<Link key={reason.id} to={`/reasons/${reason.id}`}>{reason.title}</Link>
