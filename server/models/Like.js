const mongoose = require('mongoose')
const moment = require('moment')
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
        default: moment.utc()
    }
})

module.exports = mongoose.model('likes', LikeSchema)