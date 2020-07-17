import mongoose from 'mongoose'
import conf from './config'

mongoose.connect(`mongodb://${conf.mongo.host}:${conf.mongo.port}/${conf.mongo.db}`, { useNewUrlParser: true, useFindAndModify: false })
.then(() => { console.log('DB connected') })
.catch(err => console.log(err.message))

export default mongoose
