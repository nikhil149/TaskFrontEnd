import {Link, withRouter} from 'react-router-dom'
import {Fragment} from 'react'
import {signOut, isAuthenticated} from '../auth'
import classes from './Menu.module.css'
const isActive = (history, path) =>{
    if(history.location.pathname === path){
        return {color: "#ff9900"}
    }else{
        return {color: "#ffffff"}
    }
}

const Menu = ({history}) =>{
    return(
        <div className={classes.header}>
            <ul >
                <li>
                    <Link className="nav-link" style={isActive(history, "/")} to="/">
                        Home
                    </Link>
                </li>
                {isAuthenticated()  && (
                    <li>
                        <Link className="nav-link" style={isActive(history, "/user/dashboard")} to="/user/dashboard">
                            Dashboard
                        </Link>
                    </li>
                )}
                
                {!isAuthenticated() && (
                    <Fragment>
                        <li>
                            <Link className="nav-link" style={isActive(history, "/signup")} to="/signup">
                                SignUp
                            </Link>
                        </li>
                        <li >
                            <Link className="nav-link" style={isActive(history, "/signin")} to="/signin">
                                SignIn
                            </Link>
                        </li>
                    </Fragment>
                )}
                {isAuthenticated() && (
                    <li>
                        <span className="nav-link" style={{cursor: 'pointer', color: '#ffffff'}} onClick={() =>signOut(()=>{
                            history.push('/')
                        })}>
                            Sign Out
                        </span>
                    </li>
                )}
            </ul>
        </div>
    )
}

export default withRouter(Menu)