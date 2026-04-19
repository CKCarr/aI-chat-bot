import React, { useState } from 'react'
import ChatBotStart from './Components/ChatBotStart'
import ChatBotApp from './Components/ChatBotApp'

const App = () => {
  const [isChatting, setIsChatting] = useState(false)
  const [chats, setChats] = useState([])

  // handler sets state of isChatting to true when user clicks start button on landing page
  const handleStartChat = () => {
    setIsChatting(true);
    // handles chat history list when user starts a new chat
    if (chats.length === 0) {
      const newChat = {
        id: `Chat Session ${new Date().toLocaleDateString("en-US")} ${new Date().toLocaleTimeString("en-US")}`,
        messages: [],
      }
      setChats([newChat])
    }
  };

  // handler sets state of isChatting to false when user clicks go back button in the chat app
  const handleEndChat = () => {
    setIsChatting(false);
  };



  return (
    <div className='container'>
      {/* Logic conditional state of Chat renders UI of selected state */}
      {isChatting ? <ChatBotApp onGoBack={handleEndChat} chats={chats} setChats={setChats} /> : <ChatBotStart onStartChat={handleStartChat} />}
    </div>
  )
};

export default App

