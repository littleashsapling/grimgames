const mongoose = require('mongoose')
const MONGOLOGIN = 'mongodb+srv://admin:admin@grimgames-7mfso.mongodb.net/chatandrooms?retryWrites=true&w=majority'
const mongoServer = async() => {
    try {
        await mongoose.connect(MONGOLOGIN, {
            useNewUrlParser: true,
            useUnifiedTopology: true
        })
        console.log('Mongo Connected!')
    } catch (e) {
        console.log(e)
        throw e
    }
}

module.exports = mongoServer