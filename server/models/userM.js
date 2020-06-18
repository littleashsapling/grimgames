const mongoose = require('mongoose')

//NOT DONE random id var userIDMaker = Math.floor((Math.random() * 100000))

const UserSchema = mongoose.Schema({
    username: {
        type: String,
        required: true
    },

    email: {
        type: String,
        required: false
    },
    password: {
        type: String,
        required: false
    },
    createdAt: {
        type: Date,
        default: Date.now()
    }
})

// export model user with UserSchema
module.exports = mongoose.model('user', UserSchema)