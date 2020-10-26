import React, {useState} from 'react'
import '../css/clicked-tweet.css'
import Tweets from './Tweets'
// import {useDispatch} from 'react-redux'
import '../css/user-page.css'

const UserPage = ({tweets, user}) =>{
    const [type, setType] = useState('tweets')
    const date = new Date(user.date).toLocaleString("en-US", 
    {
        timeZone: "America/Los_Angeles", 
        month: 'long', 
        year: 'numeric'
    })
    const switchTweet = (type) => {
        console.log(type)
        setType(type)
    }
    const changeCurrentTab = (button) => {
        if(type === button){
            return 'user-page-button-clicked'
        }
        return ''
    }
    const changeToLikes = () => {
        if(type === 'likes'){
            return user.likes
        }else {
            return tweets
        }
    }
    return(
        <>
            <div className = 'user-page-header'>
                <div className = 'user-page-info'>
                    <div>
                        <strong>{user.name}</strong>
                    </div>
                    <div>
                        @{user.username}
                    </div>
                    <span role = 'img' aria-label = 'create date'>📅</span> Joined {date}
                    <div>
                        <strong>{user.follows.length}</strong> Following
                        {' '}
                        <strong>{user.followers.length}</strong> Followers
                    </div>
                </div>
                <div className = 'user-page-tweet-view-buttons'>
                    <div className = {`user-page-button ${changeCurrentTab('tweets')}`}  onClick = {() => switchTweet('tweets')}>
                        Tweets
                    </div>
                    <div className = {`user-page-button ${changeCurrentTab('tweets&replies')}`}  onClick = {() => switchTweet('tweets&replies')}>
                        Tweets & replies
                    </div>
                    <div className = {`user-page-button ${changeCurrentTab('likes')}`}  onClick = {() => switchTweet('likes')}> 
                        Likes
                    </div>
                </div>
            </div>
           
            <Tweets tweets ={changeToLikes()} type = {type}/>
        </>
    )
}

export default UserPage;