import React, {useState, useEffect} from 'react'
import {useHistory} from 'react-router-dom'
import userService from '../services/users'
const CreateUser = ({hideMenu}) => {
    const history = useHistory()
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState(''); 
    const [name, setName] = useState('');
    useEffect(() => {
        if(window.localStorage.getItem('loggedUser')){
            console.log('should push')
            history.push('/')
        }
    })
    const handleUsername = e => {
        setUsername(e.target.value)
    }
    const handlePassword= e => {
        setPassword(e.target.value)
    }
    const handleName = e => {
        setName(e.target.value)
    }
    const handleSubmit = async e => {
        e.preventDefault();
        try {
            await userService.create({
                username,
                password,
                name
            })
            setUsername(null);
            setName(null);
            setPassword(null);
            hideMenu()
        }catch(error){
            console.log(error)
        }
    }
    return(
        <>
            Name:
            <div>
                <input value = {name} onChange = {handleName}></input>
            </div>
            Username:
            <div>
                <input value = {username} onChange = {handleUsername}></input>
            </div>
            Password:
            <div>
                <input type = 'password' value = {password} onChange = {handlePassword}></input>
            </div>
            <button onClick = {handleSubmit}>Create Account</button>
        </>
    )
}

export default CreateUser;