import React, {useEffect} from 'react';
import{Switch, Route, useHistory, useRouteMatch} from 'react-router-dom';
import './App.css';
// import Tweets from './components/Tweets'
import Login from './components/Login'
import CreateUser from './components/CreateUser';
import ClickedTweet from './components/ClickedTweet'
import LoginDisplay from './components/LoginDisplay'
import Header from './components/Header'
import UserPage from './components/UserPage'
import HomePage from './components/HomePage'

import {useDispatch, useSelector} from 'react-redux';
import {initTweet} from './reducers/tweetReducer';
import {getLoggedIn} from './reducers/loginReducer';
import {initUser} from './reducers/userReducer';
function App() {
    const history = useHistory();
    const tweets = useSelector(state => state.tweets);
    const user = useSelector(state => state.loggedInUser)
    const users = useSelector(state => state.users)
    const dispatch = useDispatch();
    const match = useRouteMatch('/:username/status/:id')
    const tweet = match 
        ? tweets.find(tweet => tweet.id === match.params.id)
        : null
    const matchUser = useRouteMatch('/:username')
    const username = matchUser 
        ? users.find(user => user.username === matchUser.params.username)
        : null
    const userPageDisplay = () => {
        if(username){
            return (
                <Header className = 'middle' text = {username.username} numTweets = {username.tweets.length}>
                    <UserPage user = {username} tweets = {tweets.filter(tweet => tweet.author.id === username.id)}/>
                </Header>           
            )
        }
        return null
    }
    useEffect(() =>{
        dispatch(getLoggedIn())
    }, [dispatch])
    useEffect(() => {
        dispatch(initTweet());
    },[dispatch])
    useEffect(() => {
        dispatch(initUser());
    },[dispatch])
    return (
        <div className = 'main'>
            <Switch>
                <Route exact path = '/'>
                    <LoginDisplay user = {user}>
                        <Header className = 'middle' text = 'Home'>
                            <HomePage tweets = {tweets}/>
                        </Header>
                    </LoginDisplay>
                </Route>
                <Route path = '/Login'>
                    <div>
                        <Login />
                        <button onClick = {() => history.push('/Create')}>Sign Up</button>
                    </div>
                </Route>
                <Route path = '/Create'>
                    <CreateUser/>
                </Route>
                <Route exact path="/:username">
                    <LoginDisplay user = {user}>
                        {userPageDisplay()}
                    </LoginDisplay>
                </Route>
                <Route path="/:username/status/:id">
                    <LoginDisplay user = {user}>
                        <Header className = 'middle' text = 'Tweet'>
                            <ClickedTweet tweet = {tweet} />
                        </Header>
                    </LoginDisplay>
                </Route>
            </Switch>
        </div>
    );
}

export default App;
