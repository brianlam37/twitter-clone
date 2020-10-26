import React, {useState} from 'react'
import {useHistory, Link} from 'react-router-dom';
import {useDispatch, useSelector} from 'react-redux'
import Reply from './Reply'
import Modal from './Modal'
import {like} from '../reducers/tweetReducer'
import '../css/tweet.css'
const SECONDS_IN_DAY  = 86400
const SECONDS_IN_HOUR = 3600
const SECONDS_IN_MIN = 60
const Tweet = ({tweet}) =>{

    const history = useHistory();
    const [showReply, setShowReply] = useState(false);
    const user = useSelector(state => state.loggedInUser)
    let tweetLikedIds = tweet.likes.map(l => l.id);
    const tweetLikedAlready = tweetLikedIds.findIndex(id => id === user.id);
    const dispatch = useDispatch();
    const calcTime = () => {
        let published = tweet.published;
        if(typeof(tweet.published) === 'string'){
            published = new Date(tweet.published)
        }

        const timeInSeconds = (new Date() - published)/1000

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
            if(tweetLikedAlready > -1){
                tweetLikedIds.splice(tweetLikedAlready, 1);
                dispatch(
                    like(tweet.id, {
                        ...tweet,
                        likes: tweetLikedIds
                    })
                )
            }else{
                dispatch(
                    like(tweet.id, {
                        ...tweet,
                        likes: tweetLikedIds.concat(user.id)
                    })
                )
            }
        }catch(error){
            console.log(error)
        }
    }
    const handleReply = () => {
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
            case document.getElementById(`${tweet.id}-link`):{
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
        <Modal modalId = 'modal-back-reply' show = {showReply} closeModal = {closeModal}><Reply tweet = {tweet}/></Modal>

            <div id = {tweet.id} className = 'tweet-box' onClick = {handleClickTweet}>
                <img className = 'pfp' src = 'logo192.png' alt = 'pfp'/>
                <div className = 'tweet-box-inner'>
                    <div className = 'tweet-header'>
                        <div className = 'tweet-name'>
                            <Link id = {`${tweet.id}-link`} className = 'name' to ={`/${tweet.author.username}`}>
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
                            <span id = {`${tweet.id}-likes`} className = 's-emoji' role = 'img' aria-label = 'likes' onClick = {handleLikes}>{tweetLikedAlready > -1 ? '💔' : '❤️'}</span>
                            {showNumber(tweet.likes.length)}
                        </div>
                    </div>

                </div>
            </div>
        </>
    )
}

export default Tweet;