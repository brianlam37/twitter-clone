import React, {useState} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {create as createTweet} from '../reducers/tweetReducer';
import '../css/tweet-form.css'

const TweetForm = ({DEFAULT_HEIGHT, hiddenId, tweetAreaId}) => {
    const [tweet, setTweet] = useState('');
    const user = useSelector(state => state.loggedInUser)
    const dispatch = useDispatch();
    const handleTweetText = e => {

        setTweet(e.target.value);
        console.log(tweet, 'tweet value')
        let hidden = document.getElementById(hiddenId);
        hidden.innerHTML = tweet;
        if(e.target.value === ''){
            hidden.innerHTML = '';
        }
        console.log(hidden.innerHTML)
        hidden.style.display = 'block'
        hidden.style.visibility = 'hidden';
        if(hidden.offsetHeight > DEFAULT_HEIGHT){
            e.target.style.height = hidden.offsetHeight+'px';
        }else{
            e.target.style.height = DEFAULT_HEIGHT+'px';
        }
        hidden.style.visibility = 'visible';
        hidden.style.display = 'none';
    }
    const handleTweet = async e => {
        e.preventDefault();
        const tweetObject = {
            message: tweet,
            author: user.id
        }
        setTweet('');
        let tweetArea = document.getElementById(tweetAreaId);
        tweetArea.style.height = DEFAULT_HEIGHT+'px'
        try{
            dispatch(createTweet(tweetObject)) 
        }catch (error){
            console.log(error)
        }
    }

    return (
        <div className = 'tweet-form'>
            <img className = 'pfp-home-tweet' src = 'http://localhost:3000/logo192.png' alt = 'pfp'></img>
            <div className = 'tweet-form-right'>
            <div id = {hiddenId} className = 'tweet-area-size'></div>
            <textarea  id = {tweetAreaId} className = 'tweet-area' onChange = {handleTweetText} value = {tweet} placeholder={`What's happening?`}></textarea>
            <button onClick = {handleTweet} disabled = {tweet.length === 0}>Tweet</button>
            </div>
        </div>
    )
}

export default TweetForm;