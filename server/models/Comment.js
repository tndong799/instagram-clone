const mongoose = require('mongoose');
const Schema = mongoose.Schema

const CommentSchema = new Schema({
    title: {
        type: String,
        required: true
    },
    user: {
        type: Schema.Types.ObjectId,
        ref: 'users'
    },
    post: {
        type: Schema.Types.ObjectId,
        ref: 'posts'
    },
    like: {
        type: Array,
        default: []
    },
    createAt: {
        type: Date,
        default: Date.now()
    }
})

module.exports = mongoose.model('comments', CommentSchema)