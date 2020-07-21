import express from 'express'

import Message from '../db/models/Message'
import Room from '../db/models/Room'
import User from '../db/models/User'

const route = express.Router()

route.get('/v1/rooms/:roomId/messages', (req, res) => {
  const roomId = req.params.roomId;
  const username = req.query.username;
  console.log('roomId: ', roomId)
  console.log('req.query: ', req.query)
  Room.find({ _id: roomId }, (err, rooms) => {
    if(err) return res.status(500).send({ success: false, error: err.toString()})
    console.log('rooms: ', rooms)
    const roomUsers = rooms[0].users
    if (roomUsers.includes(req.query.username)) {
      Message.find({ roomId }, (err, messages) => {
        if(err) return res.status(500).send({ success: false, error: err.toString()})
        return res.status(200).send({
          success: true,
          data: messages
        })
      })
    } else {
      return res.status(200).send({
        success: false,
        error: 'Access denied'
      })
    }
  })
})

route.post('/v1/rooms/create', (req, res) => {
  const username = req.body.username;
  console.log('Room create username: ', username)
  Room.find({ users: { $in: [username]} }, (err, data) => {
    if (err) return res.status(500).send({ success: false, error: err.toString() })
    console.log("data: ", data)
    if (data.length === 0) {
      Room.create({ users: [username]}, function (err, saved) {
        if (err) return res.status(500).send({ success: false, error: err.toString() })
        // saved!
        console.log('saved: ', saved)
        return res.status(200).send({
          success: true,
          data: saved
        })
      })
    } else {
      console.log("Return room")
      return res.status(200).send({
        success: true,
        data: data[0]
      })
    }
  })
})

route.post('/v1/rooms/join', (req, res) => {
  const username = req.body.username;
  const roomId = req.body.roomId;
  console.log('Join roomId: ', roomId)
  console.log('Join username: ', username)
  Room.find({ _id: roomId }, (err, rooms) => {
    if (err) return res.status(500).send({ success: false, error: err.toString() })
    const roomUsers = rooms[0].users
    if (roomUsers.includes(username)) {
      return res.status(200).send({
        success: true,
        data: rooms
      })
    } else {
      Room.findByIdAndUpdate(roomId, {$addToSet: { users: username }}, function (err, updated) {
        if (err) return res.status(500).send({ success: false, error: err.toString() })
        // updated!
        console.log('updated: ', updated)
        return res.status(200).send({
          success: true,
          data: updated
        })
      })
    }
  })
})

route.delete('/v1/rooms/:id', TODO)


function TODO(req, res) {
  console.log('Todo this route')
}

export default route
