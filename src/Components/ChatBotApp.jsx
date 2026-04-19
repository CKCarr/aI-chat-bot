import React from 'react'
import './ChatBotApp.css'

const ChatBotApp = () => {
    return (
        <div className='chat-app'>
            <div className="chat-list">
                <div className="chat-list-header">
                    <h2>Chat List</h2>
                    <i className='bx bx-edit-alt new-chat'></i>
                </div>
                {/* This will be mapped with the chat history */}
                <div className="chat-list-item active">
                    <h4>Name of Chat DATE 01/01/2001 TIME 00:00:00 PM</h4>
                    <i className="bx bx-x-circle"></i>
                </div>
                <div className="chat-list-item">
                    <h4>Name of Chat2 DATE 01/01/2001 TIME 00:00:00 PM</h4>
                    <i className="bx bx-x-circle"></i>
                </div>
                <div className="chat-list-item">
                    <h4>Name of Chat3 DATE 01/01/2001 TIME 00:00:00 PM</h4>
                    <i className="bx bx-x-circle"></i>
                </div>
            </div>
            {/* This will be the chat window */}
            <div className="chat-window">
                <div className="chat-title">
                    <h3>Chat with AI</h3>
                    <i className="bx bx-arrow-back arrow"></i>
                </div>
                <div className="chat">

                    <div className="prompt">Hi, I am a prompt. How are you?
                        <span>TIME 00:00:00 PM</span>
                    </div>


                    <div className="response">Hey, I am a response from an LLM. I am just a computer program responing with text based on the parameters set. I do not have feelings. I am here to help or hallucinate.  Thanks!
                        <span>TIME 00:00:00 PM</span>
                    </div>
                    <div className="typing">Typing...</div>
                </div>
                <form action="" className="msg-form">
                    <i className="fa-solid fa-face-smile emoji"></i>
                    <input type="text" className="msg-input" placeholder='Type a message...' />
                    <i className="fa-solid fa-paper-plane"></i>
                </form>
            </div>
        </div>
    )
}

export default ChatBotApp
