import React, { useEffect, useState } from 'react'
import socketIOClient  from 'socket.io-client'
import linkifyText from '../utils/linkifyText'
import './chat.css'

import { host } from '../config'

const ChatMessages = ({ username, roomId, dateFormat }) => {
  const [showSettingsModal, setShowSettingsModal] = useState(false)
  const [messages, setMessages] = useState([])

  useEffect(() => {
    const params = document.location.pathname.split('/')
    let roomId = ''
    if (params[1] === 'room' && params[2] !== '') {
      roomId = params[2]
    }
    const socket = socketIOClient(host, { query: { roomId } })
    if (roomId) {
      fetch(`${host}v1/rooms/${roomId}/messages?username=${username}`)
        .then(response => response.json())
        .then(result => {
          if (result.success) {
            setMessages(result.data)
          } else if (result.error === 'Access denied') {
              // window.history.replaceState({ roomId: '', username: '' }, '',  '/')
              // window.location.reload()
            }
        })
        .catch(err => console.log(err))
    }
    socket.on('message received', message => {
      // store.setItem('SChatUsername', currUsername)
      if (message.roomId === roomId) {
        setMessages(prev => [
          ...prev,
          message,
        ])
      }
    })
  }, [])

  useEffect(() => {
    setTimeout(() => {
      const msgDiv = document.getElementById('messages')
      if (msgDiv) {
        msgDiv.scrollTop = msgDiv.scrollHeight
      }
    }, 200)
  }, [messages])

  const format12Hours = date => {
    let hours = date.getHours()
    let minutes = date.getMinutes()
    const ampm = hours >= 12 ? 'pm' : 'am'
    hours %= 12
    hours = hours || 12 // the hour '0' should be '12'
    minutes = minutes < 10 ? `0${minutes}` : minutes
    const strTime = `${hours  }:${  minutes  } ${  ampm}`
    return strTime
  }

  const format24Hours = date => {
    const hours = date.getHours()
    let minutes = date.getMinutes()
    minutes = minutes < 10 ? `0${minutes}` : minutes
    const strTime = `${hours  }:${  minutes}`
    return strTime
  }

  function validURL(str) {
    const pattern = new RegExp('^(https?:\\/\\/)?'+ // protocol
      '((([a-z\\d]([a-z\\d-]*[a-z\\d])*)\\.)+[a-z]{2,}|'+ // domain name
      '((\\d{1,3}\\.){3}\\d{1,3}))'+ // OR ip (v4) address
      '(\\:\\d+)?(\\/[-a-z\\d%_.~+]*)*'+ // port and path
      '(\\?[;&a-z\\d%_.~+=-]*)?'+ // query string
      '(\\#[-a-z\\d_]*)?$','i'); // fragment locator
    return !!pattern.test(str)
  }

  return (
      <div id="messages" className="messages">
        {messages.length > 0 ?
          messages.map(message => {
            const time = dateFormat === '12' ? format12Hours(new Date(message.createdAt)) : format24Hours(new Date(message.createdAt))
            const isOwner = username === message.username
            const text = linkifyText(message.text)
            return (
              <div key={message._id} className={isOwner ? 'msg right' : 'msg'}>
                <div className='msg-author'>
                  {message.username}, <span className='msg-time'>{time}</span>
                </div>
                <div className='msg-text' dangerouslySetInnerHTML={{ __html: text }} />
              </div>
            )
          })
          :
          <div className='no-messages'>Messages not found</div>}
      </div>)
}

export default ChatMessages
