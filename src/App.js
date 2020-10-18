import React, {useState, useEffect} from 'react';
import{Switch, Route, useHistory} from 'react-router-dom';
import './App.css';
import Tweets from './components/Tweets'
import Login from './components/Login'
import axios from 'axios'
import CreateUser from './components/CreateUser';
import tweetService from './services/tweets'
import {useDispatch, useSelector} from 'react-redux';
import {initTweet, create as createTweet} from './reducers/tweetReducer';
function App() {
    const history = useHistory();
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [user, setUser] = useState(null);
    const [tweet, setTweet] = useState('');
    const [showLogin, setShowLogin] = useState(false);
    const [showCreate, setShowCreate] = useState(false);

    const tweets = useSelector(state => state.tweets);
    const dispatch = useDispatch();

    useEffect(() =>{
        setUser(JSON.parse(window.localStorage.getItem('loggedUser')));
    }, [])
    useEffect(() => {
        dispatch(initTweet());
    },[dispatch])
    const handleUsername = e => {
        setUsername(e.target.value);
    }
    const handlePassword = e => {
        setPassword(e.target.value);
    }
    const handleTweetText = e => {
        setTweet(e.target.value);
    }
    const handleLogin = e => {
        e.preventDefault();
        axios.post('http://localhost:3001/api/login',{
            username,
            password
        }).then(response => {
            window.localStorage.setItem('loggedUser', JSON.stringify(response.data));
            setUser(response.data)
            tweetService.setToken(response.data.token);
            setUsername('')
            setPassword('')
            history.push('/');
        }).catch(error => {
            console.log(error)
        })
    }
    const handleLogout = e => {
        window.localStorage.removeItem('loggedUser');
        setUser(null);
    }
    const handleTweet = async e => {
        e.preventDefault();
        const tweetObject = {
            message: tweet,
            author: user.id
        }
        setTweet('');
        try{
            dispatch(createTweet(tweetObject))
        }catch (error){
            console.log(error)
        }
    }

    const showLoginForm = () => {
        if(showLogin){
            
            return(
                <div>
                    <Login 
                        handleLogin = {handleLogin} 
                        handleUsername = {handleUsername} 
                        handlePassword = {handlePassword} 
                        username = {username} 
                        password = {password}
                    />
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
    const loginDisplay = () => {
        if(!user){
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
                </>
            )
        }
        tweetService.setToken(user.token)
        return (
            <>
                <div className = 'left'>
                    <textarea value = {tweet} onChange = {handleTweetText}></textarea>
                    <button onClick = {handleTweet}>Tweet</button>
                </div>
                <div className = 'right'>
                    <div>
                        Welcome <strong>{user.name}</strong>
                    </div>
                    <button onClick = {handleLogout}>Logout</button>
                </div>
            </>
        )
    }
    return (
        <div className = 'main'>
            <Switch>
                <Route exact path = '/'>

                    {loginDisplay()}

                    <Tweets className = 'middle' tweets = {tweets}/>
                </Route>
                <Route path = '/Login'>
                    <div>
                        <Login 
                            handleLogin = {handleLogin} 
                            handleUsername = {handleUsername} 
                            handlePassword = {handlePassword} 
                            username = {username} 
                            password = {password}
                        />
                        <button onClick = {() => history.push('/Create')}>Sign Up</button>
                    </div>
                </Route>
                <Route path = '/Create'>
                    <CreateUser/>
                </Route>
            </Switch>
        </div>
    );
}

export default App;
