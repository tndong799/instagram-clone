const mongoose = require('mongoose')
const moment = require('moment')

const Schema = mongoose.Schema

const UserSchema = new Schema({
    username: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    firstname: {
        type: String,
        required: true
    },
    lastname: {
        type: String,
        required: true
    },
    image: {
        type: Object,
        // default: {}
    },
    createAt: {
        type: Date,
        default: moment.utc()
    }
})

module.exports = mongoose.model('users', UserSchema)