import React from 'react'
const Tweet = ({tweet}) =>{
    return(
        <div className = 'tweet-box'>
            <div className = 'tweet-header'>
                <img className = 'pfp' src = 'logo192.png' alt = 'pfp'/>
                <div className = 'tweet-name'>
                    <h3>{tweet.author.username}</h3>
                    <h4>
                        <a href = 'someplace'>@{tweet.author.handle}</a>
                    </h4>
                </div>
            </div>
            <div className = 'message'>
                {tweet.message}
            </div>
            
            <div className = 'time'>
                {tweet.published.toLocaleString("en-US", 
                            {
                                hour:'numeric', 
                                minute:'numeric',
                                timeZone: "America/Los_Angeles", 
                                year: 'numeric', 
                                month: 'short', 
                                day: 'numeric'
                            }
                        )}
            </div>
            <hr className = 'linebreak'/>
            <div className = 'retweets'>retweets</div>
        </div>
    )
}

export default Tweet;