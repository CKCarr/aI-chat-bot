import React, { useRef, useContext, useEffect, useState, use } from "react";
import ReactMarkdown from 'react-markdown';
import EmojiPicker from 'emoji-picker-react';
import "./ChatBotApp.css";

const ChatBotApp = ({
    onGoBack,
    chats,
    setChats,
    activeChat,
    setActiveChat,
    onNewChat,
}) => {
    // state  for chat input field
    const [inputValue, setInputValue] = useState("");

    // state for chat messages
    const [messages, setMessages] = useState(chats[0]?.messages || []);

    // state for typing indicator
    const [isTyping, setIsTyping] = useState(false);

    // state of picker 
    const [showPicker, setShowPicker] = useState(false);

    // ref 
    const chatEndRef = useRef(null)
    // useEffect to update messages when chats change
    useEffect(() => {
        if (activeChat) {
            const storedMessages = JSON.parse(localStorage.getItem(activeChat)) || [];
            setMessages(storedMessages);
        }
    }, [activeChat])

    useEffect(() => {
        const activeChatObj = chats.find((chat) => chat.id === activeChat);
        setMessages(activeChatObj ? activeChatObj.messages : []);
    }, [activeChat, chats]); //useEffect to update messages when activeChat or chats change

    // handler input change in the chat input field and updates the inputValue state with the current value of the input field
    const handleInputChange = (e) => {
        setInputValue(e.target.value);
    }; // handleInputChange

    const handleEmojiSelect = (emoji) => {
        setInputValue((prev) => prev + emoji.emoji);
    };

    // handles submit message
    const sendMessage = async () => {
        if (inputValue.trim() === "") return; // prevents submitting empty messages
        const newMessage = {
            type: "prompt",
            text: inputValue,
            timestamp: new Date().toLocaleTimeString("en-US"),
        };

        if (!activeChat) {
            onNewChat(inputValue);
            setInputValue("");
        } else {
            const updatedMessages = [...messages, newMessage];
            setMessages(updatedMessages);
            localStorage.setItem(activeChat, JSON.stringify(updatedMessages));

            setInputValue(""); // resets input field

            // handle chat history when user submits a new message
            const updatedChats = chats.map((chat) => {
                if (chat.id === activeChat) {
                    return { ...chat, messages: updatedMessages };
                }
                return chat;
            }); // updatedChats

            setChats(updatedChats);
            localStorage.setItem("chats", JSON.stringify(updatedChats));
            // set typing indicator to true while waiting for response from API
            setIsTyping(true);

            // await must be async function to handle response from API call
            const response = await fetch("http://localhost:3001/api/chat", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ message: inputValue }),
            });

            const data = await response.json();
            const chatResponse = data.reply;

            const newResponse = {
                type: "response",
                text: chatResponse,
                timestamp: new Date().toLocaleTimeString(),
            }; // newResponse

            const updateMessagesWithResponse = [...updatedMessages, newResponse];
            setMessages(updateMessagesWithResponse);
            localStorage.setItem(activeChat, JSON.stringify(updateMessagesWithResponse));
            // set typing indicator to false after receiving response from API
            setIsTyping(false);

            const updateChatsWtihResponse = chats.map((chat) => {
                if (chat.id === activeChat) {
                    return { ...chat, messages: updateMessagesWithResponse };
                }
                return chat;
            }); // updateChatsWtihResponse

            setChats(updateChatsWtihResponse);
            localStorage.setItem("chats", JSON.stringify(updateChatsWtihResponse));
        } // end else

    };
    const handleKeyDown = (e) => {
        if (e.key === "Enter") {
            e.preventDefault();
            sendMessage();
        }
    }; // handleKeyDown

    const handleSelectChat = (id) => setActiveChat(id); // handleSelectChat

    const handleDeleteChat = (id) => {
        const updatedChats = chats.filter((chat) => chat.id !== id);
        setChats(updatedChats);
        localStorage.setItem("chats", JSON.stringify(updatedChats));
        localStorage.removeItem(id);

        if (id === activeChat) {
            const newActiveChat = updatedChats.length > 0 ? updatedChats[0].id : null;
            setActiveChat(newActiveChat);
        }
    }; // handleDeleteChat

    useEffect(() => {
        chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
    }, [messages]) // useEffect to scroll to the bottom of the chat window when messages change



    return (
        <div className="chat-app">
            <div className="chat-list">
                <div className="chat-list-header">
                    <h2>Chat List</h2>
                    <i className="bx bx-edit-alt new-chat" onClick={() => onNewChat()}></i>
                </div>
                {/* This will be mapped with the chat history */}
                {chats.map((chat) => (
                    <div
                        key={chat.id}
                        className={`chat-list-item 
                    ${chat.id === activeChat ? "active" : ""}`}
                        onClick={() => handleSelectChat(chat.id)}
                    >
                        <h4>{chat.displayId}</h4>
                        <i
                            className="bx bx-x-circle"
                            onClick={(e) => {
                                e.stopPropagation();
                                handleDeleteChat(chat.id);
                            }}
                        ></i>
                    </div>
                ))}
            </div>
            {/* This will be the chat window */}
            <div className="chat-window">
                <div className="chat-title">
                    <h3>Chat with AI</h3>
                    <i className="bx bx-arrow-back arrow" onClick={onGoBack}></i>
                </div>
                <div className="chat">
                    {messages.map((msg, index) => (
                        <div
                            key={index}
                            className={msg.type === "prompt" ? "prompt" : "response"}
                        >
                            <ReactMarkdown>
                                {msg.text}
                            </ReactMarkdown>
                            <span>{msg.timestamp}</span>
                        </div>
                    ))}
                    {isTyping && <div className="typing" >typing...</div>}
                    <div ref={chatEndRef}></div>
                </div>
                <form className="msg-form" onSubmit={(e) => e.preventDefault()}>
                    <i className="fa-solid fa-face-smile emoji"
                        onClick={(prev) => setShowPicker(prev => !prev)}>
                        {showPicker && (
                            <div className="picker">
                                <EmojiPicker onEmojiClick={handleEmojiSelect}
                                    width={200}
                                    height={350}
                                    emojiSize={20}
                                />
                            </div>
                        )}

                    </i>
                    <input
                        type="text"
                        className="msg-input"
                        placeholder="Type a message..."
                        value={inputValue}
                        onChange={handleInputChange}
                        onKeyDown={handleKeyDown}
                        onFocus={() => setShowPicker(false)}
                    />
                    <i className="fa-solid fa-paper-plane" onClick={sendMessage}></i>
                </form>
            </div>
        </div>
    ); // return
} // chatBotApp
export default ChatBotApp;
