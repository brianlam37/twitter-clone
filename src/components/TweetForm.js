import React, {useState} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {create as createTweet} from '../reducers/tweetReducer';
const App = () => {
    const [tweet, setTweet] = useState('');
    const user = useSelector(state => state.loggedInUser)
    const dispatch = useDispatch();
    const handleTweetText = e => {
        setTweet(e.target.value);
    }
    const handleTweet = async e => {
        e.preventDefault();
        const tweetObject = {
            message: tweet,
            author: user.id
        }
        setTweet('');
        try{
            dispatch(createTweet(tweetObject))
        }catch (error){
            console.log(error)
        }
    }

    return (
        <>
            <>
                <textarea value = {tweet} onChange = {handleTweetText}></textarea>
                <button onClick = {handleTweet}>Tweet</button>
            </>
        </>
    )
}

export default App;
