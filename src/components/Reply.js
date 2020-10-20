import React, {useState} from 'react'
import {useDispatch, useSelector} from 'react-redux'
import {reply as replyTweet} from '../reducers/tweetReducer'
import {Link} from 'react-router-dom'
import '../css/tweet.css'
const SECONDS_IN_DAY  = 86400
const SECONDS_IN_HOUR = 3600
const SECONDS_IN_MIN = 60
const Reply = ({tweet, show, closeModal}) => {
    const dispatch = useDispatch();
    const user = useSelector(state => state.loggedInUser)
    const [reply, setReply] = useState('');

    const handleReplyText = e => {
        setReply(e.target.value);
    }
    const handleTweet = async e => {
        e.preventDefault();
        let mentioned = [...tweet.mentioned];
        if(!mentioned.includes(tweet.author.id)){
            mentioned = mentioned.concat(tweet.author.id)
        }
        const tweetObject = {
            parent:tweet.id,
            message: reply,
            author: user.id,
            mentioned
        }
        setReply('');
        try{
            dispatch(replyTweet(tweet, tweetObject))
        }catch (error){
            console.log(error)
        }
    }
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
    if(!show)
        return null

    return(
        <div id = 'modal-back' className = 'modal' onClick = {closeModal}>
            <div className = 'modal-content'>
                <div className = 'inner-modal-content'>
                    <span id = 'close-button' className = 's-emoji' role = 'img' aria-label = 'close reply' onClick = {closeModal}>❌</span>
                </div>
                <hr/>
                <div className = 'inner-modal-content'>
                    <div className = 'tweet-box-reply'>
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
                        </div>
                    </div>
                    <div className = 'tweet-box-reply'>
                        <img className = 'pfp' src = 'logo192.png' alt = 'pfp'/>
                        <div className = 'tweet-box-inner'>
                            <div className = 'tweet-header'>
                                <div className = 'tweet-name'>
                                    <a href = 'someplace'>{tweet.author.name}</a>
                                    <p>
                                        {tweet.author.name}
                                    </p>
                                </div>
                            </div>
                            <div className = 'message'>
                                <textarea value = {reply} onChange = {handleReplyText}></textarea>
                                <button onClick = {handleTweet}>Tweet</button>
                            </div>
                        </div>
                    </div>

                </div>
            </div>
        </div>
    )
}

export default Reply;