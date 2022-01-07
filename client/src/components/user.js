import { useSelector} from 'react-redux'
import { useParams } from 'react-router-dom'

//up-coming feature:
//display information of single user
export const User = () => {

    const id = useParams()
    const users = useSelector(state => state.users)
    const user = users.find(u => u.id === parseInt(id))
    const quotes = useSelector(state => state.quotes)
    if (!user) return null
    
    const quotesByUser = quotes.filter(b => b.user.name === user.name)
    
    return (
      <div>
        <h1>{user.name}</h1>
        <strong>Added quotes</strong>
        {quotesByUser.map(quote =>
          <p key={quote.id}>{quote.description}</p>)}
      </div>
    )
  }