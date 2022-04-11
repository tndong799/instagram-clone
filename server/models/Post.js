const mongoose = require('mongoose')
const Schema = mongoose.Schema

const PostSchema = new Schema({
    title: {
        type: String
    },
    image: {
        type: String,
        // require: true
    },
    user: {
        type: Schema.Types.ObjectId,
        ref: 'users'
    },
    createAt: {
        type: Date,
        default: Date.now()
    }
})

module.exports = mongoose.model('posts', PostSchema)