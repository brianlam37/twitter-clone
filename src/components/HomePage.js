import React from 'react'
import '../css/tweet.css'
import Tweets from './Tweets'
import TweetForm from './TweetForm'
const HomePage = ({tweets}) =>{

    return(
        <>
            <div className = 'tweet-form-border'>
                <TweetForm hiddenId = 'hidden-box' tweetAreaId = 'actual-box' DEFAULT_HEIGHT = {54}/>
            </div>
            <Tweets tweets ={tweets}/>
        </>
    )
}

export default HomePage;