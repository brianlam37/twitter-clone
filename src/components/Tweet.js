import React from 'react'
const SECONDS_IN_DAY  = 86400
const SECONDS_IN_HOUR = 3600
const SECONDS_IN_MIN = 60
const Tweet = ({tweet}) =>{
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
    // const handleClick = (length) => {
    //     if(length > 0){
    //         return length;
    //     }
    // }
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
                        <img src = 'logo192.png' alt = 'pfp'/>{showNumber(tweet.replies.length)}
                    </div>
                    <div className = 's-button'><img src = 'logo192.png' alt = 'pfp'/>{showNumber(tweet.retweets.length)}</div>
                    <div className = 's-button'><img src = 'logo192.png' alt = 'pfp'/>{showNumber(tweet.replies.length)}</div>
                    <div className = 's-button'><img src = 'logo192.png' alt = 'pfp'/>{showNumber(tweet.replies.length)}</div>
                </div>

            </div>
        </div>
    )
}

export default Tweet;