import React from 'react'
import ReactDom from 'react-dom'
import './index.css'
import App from './layouts/App'
import store from './utils/store'

const root = document.getElementById('app')

const renderApp = () => {
  const initUsername = store.getItem('SChatUsername')
  const params = document.location.pathname.split('/')
  let roomId = ''
  if (params[1] === 'room' && params[2] !== '') {
    roomId = params[2]
  }
  ReactDom.render(<App defaults={{ username: initUsername, roomId: roomId }} />, root)
}

renderApp()
