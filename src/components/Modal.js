import React from 'react'

import '../css/modal.css'

const Modal = (props) => {
    if(!props.show)
        return null

    return(
        <div id = {props.modalId} className = 'modal' onClick = {props.closeModal}>
            <div className = 'modal-content'>
                <div className = 'inner-modal-content'>
                    <span id = 'close-button' className = 's-emoji' role = 'img' aria-label = 'close reply' onClick = {props.closeModal}>❌</span>
                </div>
                <hr/>
                {props.children}
            </div>
        </div>
    )
}

export default Modal;