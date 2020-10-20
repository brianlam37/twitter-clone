import React, {useState} from 'react'
import {Link} from 'react-router-dom'
import '../css/clicked-tweet.css'
import Tweets from './Tweets'
import {useDispatch} from 'react-redux'
import {like} from '../reducers/tweetReducer'
import Reply from './Reply'
const ClickedTweet = ({tweet}) =>{
    const dispatch = useDispatch();
    const [showReply, setShowReply] = useState(false);
    if(!tweet){
        return null
    }
    const displayStat = (value, text) => {
        if(value === 0){
            return null
        }
        if(value > 1){
            text+='s'
        }
        return(
            <div className = 'stat'>{value}{' '}{text}</div>
        )
    }
    const displayStats = (values) => {
        for(let i = 0; i < values.length; i++){
            if(values[i] > 0){
                return (
                    <div className = 'stats'>
                        {displayStat(values[0], 'Retweet')}
                        {displayStat(values[1], 'Quote Tweet')}
                        {displayStat(values[2], 'Like')}
                    </div>
                )
            }
        }
        return null
    }
    const handleLikes = async () => {
        try{
            dispatch(like(tweet.id, {
                ...tweet,
                likes:tweet.likes+1
            }))
        }catch(error){
            console.log(error)
        }
    }
    const handleReply = async () => {
        setShowReply(true)
    }
    const closeModal = (e) => {
        if(e.target === document.getElementById('modal-back')){
            setShowReply(false)
        }
        if(e.target === document.getElementById('close-button')){
            setShowReply(false)
        }
    }
    return(
        <>
        <Reply tweet = {tweet} show = {showReply} closeModal = {closeModal}></Reply>
        <div className = 'clicked-tweet-box'>
            <div className = 'clicked-tweet-header'>
                <img className = 'clicked-tweet-pfp' src = {`http://localhost:3000/logo192.png`} alt = 'pfp'/>
                <div className = 'clicked-tweet-name'>
                    <a href = 'someplace'>{tweet.author.name}</a>
                    <p>
                        @{tweet.author.username}
                    </p>
                </div>
            </div>
            <div className = 'clicked-tweet-message'>
                {tweet.message}
            </div>
            <div className = 'clicked-tweet-footer'>
                <div className = 'clicked-time'>
                    <Link to ={`/${tweet.author.username}/status/${tweet.id}`}>
                        {tweet.published.toLocaleString("en-US", 
                                    {
                                        hour:'numeric', 
                                        minute:'numeric',
                                        timeZone: "America/Los_Angeles", 
                                    }
                        )}
                        {' · '}
                        {tweet.published.toLocaleString("en-US", 
                            {
                                timeZone: "America/Los_Angeles", 
                                year: 'numeric', 
                                month: 'short', 
                                day: 'numeric'
                            }
                        )}
                    </Link>
                </div>
                {displayStats([tweet.retweets.length,tweet.quotes.length,tweet.likes])}
                <div className = 'stats'>
                    <div className = 'button'>
                        <span id = 'replies'className = 's-emoji' role = 'img' aria-label = 'replies' onClick = {handleReply}>💬</span>
                    </div>
                    <div className = 'button'>
                        <span id = 're-tweets' className = 's-emoji' role = 'img' aria-label = 'retweets'>🔁</span>
                    </div>
                    <div className = 'button'>
                        <span id = 'likes' className = 's-emoji' role = 'img' aria-label = 'likes' onClick = {handleLikes}>❤️</span>
                    </div>
                </div>
                {console.log(tweet.replies)}
            </div>
            </div>
            <Tweets tweets ={tweet.replies} type = 'tweets&replies'/>
        </>
    )
}

export default ClickedTweet;