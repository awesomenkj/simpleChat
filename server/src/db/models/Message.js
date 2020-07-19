import { customAlphabet } from 'nanoid'
import mongoose from '../connection'

const nanoid = customAlphabet('1234567890abcdef', 10)

const { Schema } = mongoose

const messageSchema = new Schema({
  _id: {
    type: String,
    default: () => nanoid()
  },
  createdAt: {
    type: Date,
    default: Date.now
  },
  username: {
    type: String,
    required: true,
    trim: true
  },
  roomId: {
    type: String,
    required: true
  },
  text: { type: String, trim: true }
})

export default mongoose.model('message', messageSchema)
