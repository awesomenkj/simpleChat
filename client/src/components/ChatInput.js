import React from 'react'
import socketIOClient  from 'socket.io-client'
import './chat.css'
import { host } from '../config'

const ChatInput = ({ username, roomId, chatKeys }) => {
  const send = e => {
    e.preventDefault()
    e.stopPropagation()
    const socket = socketIOClient(host, { query: { roomId } })

    const data = {
      createdAt: new Date(),
      username,
      text: e.target.message ? e.target.message.value : e.target.value,
      roomId,
    }
    socket.emit('chat message', data)

    if (e.target.message) {
      e.target.message.value = ''
    } else {
      e.target.value = ''
    }
  }

  const handleKeyDown = e => {
    if (e.keyCode === 13 && chatKeys === 'on') {
      if (e.metaKey) {
        send(e)
      }

    }
  }

  /*

  //is typing...
    let typing = document.getElementById("typing");

    //isTyping event
    messageInput.addEventListener("keypress", () => {
      socket.emit("typing", { username: "Guest 1", message: "is typing..." });
    });

    socket.on("notifyTyping", data => {
      typing.innerText = data.username + " " + data.message;
      console.log(data.username + data.message);
    });

    //stop typing
    messageInput.addEventListener("keyup", () => {
      socket.emit("stopTyping", "");
    });

    socket.on("notifyStopTyping", () => {
      typing.innerText = "";
    });
  */

  return (
      <div className="bottom_wrapper clearfix">
          <i id="typing" />
          <form onSubmit={send} id="form">
              <div className="message_input_wrapper">
                <input type="text" id="message" className="message_input" placeholder="Enter a message..." onKeyDown={handleKeyDown} />
                <button type="submit" className="send_message">Send</button>
              </div>
          </form>
  </div>)
}

export default ChatInput
