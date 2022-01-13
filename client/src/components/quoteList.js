import { useSelector } from 'react-redux'
import { QuoteForm } from './quoteForm'
import { Quote } from './quote'
import { Notification } from './notification'


export const QuoteList = () => {
  
  const quotes = useSelector(state => state.quotes)
  const quotesSortedByLikes = quotes ? quotes.sort((a, b) => (b.likes - a.likes)) : []
  
  return (
    <div className="quote-list">
      <Notification />  
      <QuoteForm />
      {quotesSortedByLikes.map(quote =>
        <Quote key={`quote-${quote._id}`} quote={quote}/>
      )}
    </div>
  )
}
