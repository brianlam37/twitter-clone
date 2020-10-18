import React from 'react'
import Tweet from './Tweet'
const Tweets = ({tweets}) =>{
    return(
        <div>
            {tweets.map(
                tweet => {
                    return(
                        <Tweet key = {tweet.id} tweet = {tweet}/>
                    )
                }).sort((a, b) => b.published - a.published)
            }
        </div>
    )
}

export default Tweets;