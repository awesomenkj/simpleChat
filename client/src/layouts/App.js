import React, { useState, useEffect } from 'react'
import Login from '../pages/Login'
import Chat from '../components/Chat'
import store from '../utils/store'
import { host } from '../config'
import './App.css'

const App = ({ defaults }) => {
  const [roomId, setRoomId] = useState(defaults.roomId)
  const [username, setUsername] = useState(defaults.username)
  const [isRegistered, setIsRegistered] = useState(defaults.username && defaults.roomId)

  useEffect(() => {
    const params = document.location.pathname.split('/')
    let roomId = ''
    if (params[1] === 'room' && params[2] !== '') {
      roomId = params[2]
      setRoomId(roomId)
      const initUsername = store.getItem('SChatUsername')
      if (initUsername) {
        fetch(`${host}v1/rooms/join`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json;charset=utf-8',
          },
          body: JSON.stringify({
            roomId,
            username: initUsername,
          }),
        })
          .then(response => response.json())
          .then(result => {
            if (result.success) {
              setIsRegistered(true)
              // window.history.pushState({ roomId, username: newUsername }, '',  '/room/' + roomId)
            }
          })
          .catch(err => console.log(err))
      }
    }
  }, [document.location.pathname])

  useEffect(() => {
    window.onpopstate = function(event) {
      const {state} = event
      setUsername(state.username)
      setRoomId(state.roomId)
      console.log(`location: ${  document.location.pathname  }, state: ${  JSON.stringify(event.state)}`);
    }
  }, [])

  const register = e => {
    e.persist()
    e.preventDefault()
    const newUsername = e.target.user.value
    if (roomId && newUsername) {
      fetch(`${host}v1/rooms/join`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json;charset=utf-8',
        },
        body: JSON.stringify({
          roomId,
          username: newUsername,
        }),
      })
        .then(response => response.json())
        .then(result => {
          if (result.success) {
            store.setItem('SChatUsername', newUsername)
            setUsername(newUsername)
            setIsRegistered(true)
            // window.history.pushState({ roomId, username: newUsername }, '',  '/room/' + roomId)
          }
        })
        .catch(err => console.log(err))
    } else if (newUsername) {
        fetch(`${host}v1/rooms/create`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json;charset=utf-8',
          },
          body: JSON.stringify({
            username: newUsername,
          }),
        })
          .then(response => response.json())
          .then(result => {
            if (result.data._id) {
              store.setItem('SChatUsername', newUsername)
              setUsername(newUsername)
              setRoomId(result.data._id)
              setIsRegistered(true)
              window.history.pushState({ roomId: result.data._id, username: newUsername }, '',  `/room/${  result.data._id}`)
            }
          })
          .catch(err => console.log(err))
      }
  }

  return (
    <div className="App">
      {
        isRegistered
          ? <Chat username={username} roomId={roomId} />
          : <Login register={register} />
      }
    </div>
  )
}

export default App
