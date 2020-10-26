import React, {useState} from 'react'
import {useDispatch, useSelector} from 'react-redux'
import {reply as replyTweet} from '../reducers/tweetReducer'
import {Link} from 'react-router-dom'
import '../css/tweet.css'
import '../css/reply.css'
const SECONDS_IN_DAY  = 86400
const SECONDS_IN_HOUR = 3600
const SECONDS_IN_MIN = 60
const Reply = ({tweet}) => {

    const dispatch = useDispatch();
    const user = useSelector(state => state.loggedInUser)
    const [reply, setReply] = useState('');
    const handleReplyText = e => {
        setReply(e.target.value);
    }

    const handleTweet = async e => {
        e.preventDefault();
        let mentioned = [...tweet.mentioned].map(author => author.id);
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
    return(
        <div className = 'inner-modal-content'>
            <div className = 'tweet-box-reply'>
                <img className = 'pfp' src = 'http://localhost:3000/logo192.png' alt = 'pfp'/>
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
                <div className = 'reply-line'>
                    <div className = 'reply-left'></div>
                    <div className = 'reply-right'></div>
                </div>
                <div className = 'reply-names'>Replying to 
                    <Link className = 'reply-name' to ={`/${tweet.author.username}`}>
                        {' '}@{tweet.author.username}
                    </Link>
                    {tweet.mentioned.filter(author => author.id !== tweet.author.id).map((author) => {
                        return(
                            <Link key = {author.username+author.id} className = 'name' to ={`/${author.username}`}>
                                @{author.username}
                            </Link>
                        )
                    })
                    }
                </div>
            </div>
            <div className = 'tweet-box-reply'>
                <img className = 'pfp' src = 'logo192.png' alt = 'pfp'/>
                <div className = 'tweet-box-inner'>
                    <div className = 'message'>
                        <textarea value = {reply} onChange = {handleReplyText}></textarea>
                        <button onClick = {handleTweet}>Tweet</button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Reply;