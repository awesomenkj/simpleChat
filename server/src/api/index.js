import express from 'express'

import Message from '../db/models/Message'
import Room from '../db/models/Room'
import User from '../db/models/User'

const route = express.Router()



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



function TODO(req, res) {
  console.log('Todo this route')
}

export default route
