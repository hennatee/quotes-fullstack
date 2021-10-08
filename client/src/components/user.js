import { useSelector} from 'react-redux'
import { useParams } from 'react-router-dom'



//up-coming feature:
//display information of single user
export const User = () => {

    const id = useParams()
    const users = useSelector(state => state.users)
    const user = users.find(u => u.id === parseInt(id))
    const reasons = useSelector(state => state.reasons)
    if (!user) return null
    
    const reasonsByUser = reasons.filter(b => b.user.name === user.name)
    
  
    return (
      <div>
        <h1>{user.name}</h1>
        <strong>Added reasons</strong>
        {reasonsByUser.map(reason =>
          <p key={reason.id}>{reason.title}</p>)}
      </div>
    )
  }