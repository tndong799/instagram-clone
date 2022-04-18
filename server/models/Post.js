const mongoose = require('mongoose')
const moment = require('moment')

const Schema = mongoose.Schema

const PostSchema = new Schema({
    title: {
        type: String
    },
    image: {
        type: Object,
        // require: true
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

module.exports = mongoose.model('posts', PostSchema)