import React, {useState} from 'react'
import {useHistory, Link} from 'react-router-dom';
import {useDispatch} from 'react-redux'
import Reply from './Reply'
import {like} from '../reducers/tweetReducer'
import '../css/tweet.css'
const SECONDS_IN_DAY  = 86400
const SECONDS_IN_HOUR = 3600
const SECONDS_IN_MIN = 60
const Tweet = ({tweet}) =>{
    const history = useHistory();
    const [showReply, setShowReply] = useState(false);
    const dispatch = useDispatch();
    const calcTime = () => {
        const timeInSeconds = (new Date() - tweet.published)/1000
        if(timeInSeconds > SECONDS_IN_DAY){
            return tweet.published.toLocaleString("en-US", 
            {
                timeZone: "America/Los_Angeles", 
                month: 'short', 
                day: 'numeric'
            }
        )
        }
        if(timeInSeconds > SECONDS_IN_HOUR){
            return `${Math.floor((timeInSeconds/SECONDS_IN_HOUR))}h`
        }
        if(timeInSeconds > SECONDS_IN_MIN){
            return `${Math.floor((timeInSeconds/SECONDS_IN_MIN))}m`
        }
        return `${Math.floor((timeInSeconds))}s`
    }
    const showNumber = (length) => {
        if(length > 0){
            return length;
        }
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
    const handleClickTweet = (e) => {
        let selection = window.getSelection().toString()
        if (selection) {
            return;
        }
        switch(e.target){
            case document.getElementById(`${tweet.id}-likes`):{
                break;
            }
            case document.getElementById(`${tweet.id}-replies`):{
                break;
            }
            default:{
                e.preventDefault()
                history.push(`/${tweet.author.username}/status/${tweet.id}`);
            }
        }

    }
    return(
        <>
            <Reply tweet = {tweet} show = {showReply} closeModal = {closeModal}></Reply>
            <div id = {tweet.id} className = 'tweet-box' onClick = {handleClickTweet}>
                <img className = 'pfp' src = 'logo192.png' alt = 'pfp'/>
                <div className = 'tweet-box-inner'>
                    <div className = 'tweet-header'>
                        <div className = 'tweet-name'>
                            <Link className = 'name' to ={`/${tweet.author.username}`}>
                                {tweet.author.name}
                            </Link>
                            <p>
                                @{tweet.author.username} 
                                {' · '} 
                                <Link className = 'time' to ={`/${tweet.author.username}/status/${tweet.id}`}>
                                    {calcTime()}
                                </Link>
                            </p>
                        </div>
                    </div>
                    <div className = 'message'>
                        {tweet.message}
                    </div>
                    <div className = 'tweet-footer'>
                        <div className = 's-button'>
                            <span id = {`${tweet.id}-replies`} className = 's-emoji' role = 'img' aria-label = 'replies' onClick = {handleReply}>💬</span>
                            {showNumber(tweet.replies.length)}
                        </div>
                        <div className = 's-button'>
                            <span id = 're-tweets' className = 's-emoji' role = 'img' aria-label = 'retweets' >🔁</span>
                            {showNumber(tweet.retweets.length)}</div>
                        <div  className = 's-button'>
                            <span id = {`${tweet.id}-likes`} className = 's-emoji' role = 'img' aria-label = 'likes' onClick = {handleLikes}>❤️</span>
                            {showNumber(tweet.likes)}
                        </div>
                    </div>

                </div>
            </div>
        </>
    )
}

export default Tweet;