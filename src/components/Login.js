import React, {useEffect, useState} from 'react';
import {useHistory} from 'react-router-dom'
import {useDispatch, useSelector} from 'react-redux';
import {getLoggedIn, login} from '../reducers/loginReducer';
const Login = () =>{
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const history = useHistory();
    const dispatch = useDispatch();
    const user = useSelector(state => state.loggedInUser)
    useEffect(() => {
        dispatch(getLoggedIn());
        if(user){
            history.push('/')
        }
    },[dispatch, user, history])
    const handleUsername = e => {
        setUsername(e.target.value);
    }
    const handlePassword = e => {
        setPassword(e.target.value);
    }
    const handleLogin = e => {
        e.preventDefault();
        const loginInfo = {
            username,
            password
        }
        dispatch(login(loginInfo))
    }
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