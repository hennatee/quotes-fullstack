import { LoginForm } from "../components/loginForm"
import { Logout } from "../components/logout"
import { ReasonList } from "../components/reasonList"

export const HomePage = ({user}) => {

    return (
        
        <div>
            {user 
            ? <div>
                <Logout user={user}/> 
                <ReasonList/>
              </div>  
            : <LoginForm/>
            }
        
        </div>
    )
}