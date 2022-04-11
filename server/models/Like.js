const mongoose = require('mongoose')
const Schema = mongoose.Schema

const LikeSchema = new Schema({
    post: {
        type: Schema.Types.ObjectId,
        ref: 'posts'
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

module.exports = mongoose.model('likes', LikeSchema)