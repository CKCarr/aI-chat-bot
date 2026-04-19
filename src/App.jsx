import React, { useState } from 'react'
import ChatBotStart from './Components/ChatBotStart'
import ChatBotApp from './Components/ChatBotApp'

const App = () => {
  const [isChatting, setIsChatting] = useState(false)

  const handleStartChat = () => {
    setIsChatting(true);
  };

  const handleEndChat = () => {
    setIsChatting(false);
  };

  return (
    <div className='container'>
      {/* Logic conditional state of Chat renders UI of selected state */}
      {isChatting ? <ChatBotApp onGoBack={handleEndChat} /> : <ChatBotStart onStartChat={handleStartChat} />}
    </div>
  )
};

export default App

