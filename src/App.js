import React, {useEffect} from 'react';
import{Switch, Route, useHistory, useRouteMatch} from 'react-router-dom';
import './App.css';
import Tweets from './components/Tweets'
import Login from './components/Login'
import CreateUser from './components/CreateUser';

import ClickedTweet from './components/ClickedTweet'
import LoginDisplay from './components/LoginDisplay'

import {useDispatch, useSelector} from 'react-redux';
import {initTweet} from './reducers/tweetReducer';
import {getLoggedIn} from './reducers/loginReducer';
function App() {
    const history = useHistory();
    const tweets = useSelector(state => state.tweets);
    const user = useSelector(state => state.loggedInUser)
    const dispatch = useDispatch();
    const match = useRouteMatch('/:username/status/:id')
    const tweet = match 
      ? tweets.find(tweet => tweet.id === match.params.id)
      : null
    useEffect(() =>{
        dispatch(getLoggedIn())
    }, [dispatch])
    useEffect(() => {
        dispatch(initTweet());
    },[dispatch])
    return (
        <div className = 'main'>
            <Switch>
                <Route exact path = '/'>
                    <LoginDisplay user = {user}>
                        <Tweets className = 'middle' tweets = {tweets}/>
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
                <Route path="/:username/status/:id">
                    <LoginDisplay user = {user}>
                        <div className = 'middle'>
                            <ClickedTweet className = 'middle' tweet = {tweet} />
                        </div>
                    </LoginDisplay>
                </Route>
            </Switch>
        </div>
    );
}

export default App;
