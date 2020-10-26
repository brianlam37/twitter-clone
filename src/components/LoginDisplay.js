import React, {useState} from 'react'
import tweetService from '../services/tweets'
// import TweetForm from './TweetForm'
import Login from './Login'
import CreateUser from './CreateUser'
import {useDispatch} from 'react-redux'
import {logout} from '../reducers/loginReducer'
import LeftHome from './LeftHome'
const LoginDisplay = (props) => {
    const dispatch = useDispatch();
    const [showLogin, setShowLogin] = useState(false);
    const [showCreate, setShowCreate] = useState(false);
    const handleLogout = e => {
        dispatch(logout());
    }

    const showLoginForm = () => {
        if(showLogin){
            
            return(
                <div>
                    <Login/>
                    <button onClick = {() => setShowLogin(false)}>Cancel</button>
                </div>

            )
        }
    }
    const showCreateForm = () => {
        if(showCreate){

            return(
                <>
                    <CreateUser hideMenu = {() => {setShowCreate(false)}}/>
                    <button onClick = {() => setShowCreate(false)}>Cancel</button>
                </>

            )
        }
    }
    const handleShow = (login, create) => {
        setShowLogin(login)
        setShowCreate(create)
    }
    if(!props.user){
        return (
            <>
                <div className = 'left'>
                    Sign in to Tweet!
                </div>
                <div className = 'right'>
                    <div>
                        <button onClick = {() => handleShow(true,false)}>Login</button>
                        {' or '} 
                        <button onClick = {() => handleShow(false,true)}>Sign Up</button>
                    </div>
                    {showLoginForm()}
                    {showCreateForm()}
                </div>
                {props.children}
            </>
        )
    }
    tweetService.setToken(props.user.token)
    return (
        <>
            <div className = 'left'>
                <LeftHome/>
            </div>
            <div className = 'right'>
                <div>
                    Welcome <strong>{props.user.name}</strong>
                </div>
                <button onClick = {handleLogout}>Logout</button>
            </div>
            {props.children}
        </>
    )
}

export default LoginDisplay;