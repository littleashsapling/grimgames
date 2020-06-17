//backend server
const path = require('path')
const http = require('http')
const express = require('express')
const socketio = require('socket.io')

const app = express()
const server = http.createServer(app)
const io = socketio(server)
    //static folder
app.use(express.static(path.join(__dirname, 'front')))

// Run when client connects
io.on('connection', socket => {
    console.log('New connection!')
})

//database
const mongoose = require('mongoose')
mongoose.connect('mongodb+srv://admin:admin@grimgames-7mfso.mongodb.net/chatandrooms?retryWrites=true&w=majority', {
    useNewUrlParser: true,
    useUnifiedTopology: true
}, (err) => {
    console.log('mongodb connected!', err)
})

//starting server
const PORT = 3000 || process.env.PORT
server.listen(PORT, () => console.log(`Server running on port ${PORT}`))