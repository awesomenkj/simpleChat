import Message from '../db/models/Message'

const sendMessages = (io, data) => {
  console.log('data: ', data)
  const message = new Message({
    username: data.username,
    roomId: data.roomId,
    text: data.text
  })
  message.save((err, message) => {
    if (err) {
      console.log('Error of saving')
      console.log('err')
    }
  })
  io.emit('message received', message)
}

export {
  sendMessages
}
