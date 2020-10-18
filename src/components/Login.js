import React, {useEffect} from 'react';
import {useHistory} from 'react-router-dom'

const Login = ({handleLogin, handlePassword, handleUsername, username, password}) =>{
    const history = useHistory();
    useEffect(() => {
        if(window.localStorage.getItem('loggedUser')){
            console.log('should push')
            history.push('/')
        }
    })
    return(
        <>
            Username:
            <div>
                
                <input value = {username} onChange = {handleUsername}/>
            </div>
            Password: 
            <div>
                <input type ='password' value = {password} onChange = {handlePassword}/>
            </div>
            <button onClick = {handleLogin}>Login</button>
        </>
    )
}

export default Login;