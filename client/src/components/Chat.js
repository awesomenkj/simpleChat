import React, { useState } from 'react'
import Settings from '../modals/Settings'
import store from '../utils/store'

import ChatMessages from './ChatMessages'
import ChatInput from './ChatInput'
import './chat.css'

const Chat = ({ username, roomId }) => {
  const [showSettingsModal, setShowSettingsModal] = useState(false)
  const [dateFormat, setDateFormat] = useState(store.getItem('SChatDateFormat') || '24')
  const [chatKeys, setChatKeys] = useState(store.getItem('SChatKeys') || 'on')

  const handleSettingsModal = () => {
    setShowSettingsModal(!showSettingsModal)
  }

  return (<div className="chat_window">
      <div className="top_menu">
          <div className="title">Chat (#{roomId})</div>
          <div className="buttons">
              <button id='settings_button' className="button" onClick={handleSettingsModal}>Settings</button>
          </div>
      </div>

      <ChatMessages username={username} roomId={roomId} dateFormat={dateFormat} />

      <ChatInput username={username} roomId={roomId} chatKeys={chatKeys} />

      
  </div>)
}

export default Chat
