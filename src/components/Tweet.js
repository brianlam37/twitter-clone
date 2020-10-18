import React from 'react'
import tweetService from '../services/tweets'
import {useDispatch} from 'react-redux'
import {like} from '../reducers/tweetReducer'
const SECONDS_IN_DAY  = 86400
const SECONDS_IN_HOUR = 3600
const SECONDS_IN_MIN = 60
const Tweet = ({tweet}) =>{
    const dispatch = useDispatch();
    const calcTime = () => {
        const timeInSeconds = (new Date() - tweet.published)/1000
        if(timeInSeconds > SECONDS_IN_DAY){
            return `${Math.floor((timeInSeconds/SECONDS_IN_DAY))}d`
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
        // console.log(tweet)
        // console.log({
        //         ...tweet,
        //         likes:tweet.likes+1
        //     })
    }
    return(
        <div className = 'tweet-box'>
            <img className = 'pfp' src = 'logo192.png' alt = 'pfp'/>
            <div className = 'tweet-box-inner'>
                <div className = 'tweet-header'>
                    <div className = 'tweet-name'>
                        <a href = 'someplace'>{tweet.author.name}</a>
                        <p>
                            @{tweet.author.username} · {calcTime()}
                        </p>
                    </div>
                </div>
                <div className = 'message'>
                    {tweet.message}
                </div>
                <div className = 'tweet-footer'>
                    <div className = 's-button'>
                        <img src = 'logo192.png' alt = 'reply'/>{showNumber(tweet.replies.length)}
                    </div>
                    <div className = 's-button'><img src = 'logo192.png' alt = 're-tweet'/>{showNumber(tweet.retweets.length)}</div>
                    <div className = 's-button'><img src = 'logo192.png' alt = 'quote'/>{showNumber(tweet.quotes.length)}</div>
                    <div className = 's-button'><img src = 'logo192.png' alt = 'like' onClick = {handleLikes}/>{showNumber(tweet.likes)}</div>
                </div>

            </div>
        </div>
    )
}

export default Tweet;