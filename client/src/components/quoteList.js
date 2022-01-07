import React, { useEffect } from 'react'
import { initializeQuotes } from '../reducers/reducer-quote'
import { useSelector, useDispatch } from 'react-redux'
import { QuoteForm } from './quoteForm'
import { Quote } from './quote'
import { Notification } from './notification'


export const QuoteList = () => {

    let dispatch = useDispatch()
  
    useEffect(() => {
      dispatch(initializeQuotes())
      console.log("init")
    }, [dispatch])
  
    const quotes = useSelector(state => state.quotes)
    console.log("quotes", quotes)
    const quotesSortedByLikes = quotes && quotes.sort((a, b) => (b.likes - a.likes))
  
    return (
      <div className="quotes-list">
        <Notification/>  
        <QuoteForm />
        {quotes && quotesSortedByLikes.map(quote =>
            <Quote key={`quote-${quote.id}`} quote={quote}/>
          )}
      </div>
    )
  }


