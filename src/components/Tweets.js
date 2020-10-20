import React from 'react'
import Tweet from './Tweet'
const Tweets = ({tweets, type}) =>{
    console.log(type)
    switch (type) {
        case 'tweets':{
            return(
                <div>
                    {tweets.filter(tweet => tweet.parent).map(
                        tweet => {
                            return(
                                <Tweet key = {tweet.id} tweet = {tweet}/>
                            )
                        }).sort((a, b) => b.published - a.published)
                    }
                </div>
            )
        }
        case 'tweets&replies': {
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
        default:{
            return(
                <div>
                    {tweets.filter(tweet => !tweet.parent).map(
                        tweet => {
                            return(
                                <Tweet key = {tweet.id} tweet = {tweet}/>
                            )
                        }).sort((a, b) => b.published - a.published)
                    }
                </div>
            )
        }
    }
}

export default Tweets;