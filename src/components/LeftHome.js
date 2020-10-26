import React, {useState} from 'react';
import Modal from './Modal'
import TweetForm from './TweetForm'
const LeftHome = () => {
    const [showModal, setShowModal] = useState(false);
    const handleReply = () => {
        setShowModal(true)
    }
    const closeModal = (e) => {
        if(e.target === document.getElementById('modal-back-tweet')){
            setShowModal(false)
        }
        if(e.target === document.getElementById('close-button')){
            setShowModal(false)
        }
    }
    return (
        <>
            <Modal modalId = 'modal-back-tweet' show = {showModal} closeModal = {closeModal}>
                <TweetForm hiddenId = 'modal-tweet-area-size' tweetAreaId = 'modal-tweet-area' DEFAULT_HEIGHT = {108}/>
            </Modal>
            <ul>
                <li>
                    <span role = 'img' aria-label = 'home'></span>
                </li>
                <li>
                    <span role = 'img' aria-label = 'home'>🏠 Home</span>
                </li>
                <li>
                    <span role = 'img' aria-label = 'explore'># Explore</span>
                </li>
                <li>
                    <span role = 'img' aria-label = 'notifications'>🔔 Notification</span>
                </li>
                <li>
                    <span role = 'img' aria-label = 'messages'>✉️ Messages</span>
                </li>
                <li>
                    <span role = 'img' aria-label = 'bookmarks'>🔖 Bookmarks</span>
                </li>
                <li>
                    <span role = 'img' aria-label = 'lists'>📝 Lists</span>
                </li>
                <li>
                    <span role = 'img' aria-label = 'profiles'>🙍 Profile</span>
                </li>
                <li>
                    <span role = 'img' aria-label = 'more'>... More</span>
                </li>
            </ul>
            <button onClick = {handleReply} >Tweet</button>

        </>
    )
}

export default LeftHome;