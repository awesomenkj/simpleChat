import { customAlphabet } from 'nanoid'
import mongoose from '../connection'

const nanoid = customAlphabet('1234567890abcdef', 10)

const { Schema } = mongoose

const roomSchema = new Schema({
  _id: {
    type: String,
    default: () => nanoid()
  },
  createdAt: {
    type: Date,
    default: Date.now
  },
  updatedAt: {
    type: Date,
    default: Date.now
  },
  users: [{
    type: String
    // type: Schema.Types.ObjectId,
    // ref: 'User'
  }],
})

export default mongoose.model('room', roomSchema)
