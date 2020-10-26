import React from 'react'
import {useHistory} from 'react-router-dom'
const Header = (props) => {
    const history = useHistory()
    const handleBack = e => {
        history.goBack();
    }
    const showButton = () => {
        switch (props.text) {
            case 'Home':{
                return null
            }
            default:
                return(
                    <span className = 's-emoji' role = 'img' aria-label = 'back-arrow' onClick = {handleBack}>⬅️</span>
                )
        }
    }
    return(
        <div>
            <div className = 'header'>
                <div  className = 'header-left'>
                    {showButton()}
                </div>
                <div className = 'header-right'>
                    <strong>{props.text}</strong>
                    {props.numTweets ? (<div>{props.numTweets} Tweets</div>) : null}
                </div>
            </div>
            {props.children}
        </div>
    )
}
export default Header;
