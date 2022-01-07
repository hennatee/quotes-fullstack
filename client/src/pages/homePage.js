import { LoginForm } from "../components/loginForm"
import { Logout } from "../components/logout"
import { QuoteList } from "../components/quoteList"

export const HomePage = ({user}) => {

    return (
        <div>
            {user 
            ? <div>
                <Logout user={user}/> 
                <QuoteList/>
              </div>  
            : <LoginForm/>
            }
        </div>
    )
}