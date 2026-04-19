import React, { useState } from 'react'
import ChatBotStart from './Components/ChatBotStart'
import ChatBotApp from './Components/ChatBotApp'
import { v4 as uuidv4 } from 'uuid'

const App = () => {
  const [isChatting, setIsChatting] = useState(false)
  // stores list of chat sessions
  const [chats, setChats] = useState([])
  const [activeChat, setActiveChat] = useState(null)

  // handler sets state of isChatting to true when user clicks start button on landing page
  const handleStartChat = () => {
    setIsChatting(true);
    // handles chat history list when user starts a new chat
    if (chats.length === 0) {
      createNewChat()
    }
  };

  // handler sets state of isChatting to false when user clicks go back button in the chat app
  const handleEndChat = () => {
    setIsChatting(false);
  };

  const createNewChat = () => {
    const newChat = {
      id: uuidv4(),
      displayId: `Chat Session ${new Date().toLocaleDateString("en-US")} ${new Date().toLocaleTimeString("en-US")}`,
      messages: [],
    }
    const updatedChats = [newChat, ...chats]
    setChats(updatedChats)
    setActiveChat(newChat.id)
  }

  return (
    <div className='container'>
      {/* Logic conditional state of Chat renders UI of selected state */}
      {isChatting ? (
        <ChatBotApp onGoBack={handleEndChat}
          chats={chats}
          setChats={setChats}
          activeChat={activeChat}
          setActiveChat={setActiveChat}
          onNewChat={createNewChat}
        />
      ) : (
        <ChatBotStart onStartChat={handleStartChat} />
      )}
    </div>
  )
};

export default App

