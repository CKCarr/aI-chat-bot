import React, { useState } from 'react'
import './ChatBotApp.css'

const ChatBotApp = ({ onGoBack, chats, setChats }) => {
    // state  for chat input field 
    const [inputValue, setInputValue] = useState('');

    // state for chat messages
    const [messages, setMessages] = useState(chats[0]?.messages || []);

    // handler input change in the chat input field and updates the inputValue state with the current value of the input field
    const handleInputChange = (e) => {
        setInputValue(e.target.value);
    };

    // handles submit message 
    const sendMessage = () => {
        if (inputValue.trim === '') return; // prevents submitting empty messages
        const newMessage = {
            type: "prompt",
            text: inputValue,
            timestamp: new Date().toLocaleTimeString("en-US"),
        }

        const updatedMessages = [...messages, newMessage];
        setMessages(updatedMessages);
        setInputValue(''); // resets input field

        // handle chat history when user submits a new message, updates the messages array of the first chat in the chat history with the updated messages array
        const updatedChats = chats.map((chat, index) => {
            if (index === 0) {
                return { ...chats, messages: updatedMessages };
            }
            return chat;
        });
        setChats(updatedChats);
    }

    return (
        <div className='chat-app'>
            <div className="chat-list">
                <div className="chat-list-header">
                    <h2>Chat List</h2>
                    <i className='bx bx-edit-alt new-chat'></i>
                </div>
                {/* This will be mapped with the chat history */}
                {chats.map((chat, index) =>
                (<div key={index} className={`chat-list-item ${index === 0 ? 'active' : ''}`}>
                    <h4>{chat.id}</h4>
                    <i className="bx bx-x-circle"></i>
                </div>)
                )}
            </div>
            {/* This will be the chat window */}
            <div className="chat-window">
                <div className="chat-title">
                    <h3>Chat with AI</h3>
                    <i className="bx bx-arrow-back arrow" onClick={onGoBack}></i>
                </div>
                <div className="chat">

                    <div className="prompt">Hi, I am a prompt. How are you?
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
