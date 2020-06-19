//backend server
const path = require('path')
const http = require('http')
const express = require('express')
const bodyParser = require('body-parser')
const socketio = require('socket.io')
const MongoServer = require('./server/db')
const User = require('./server/routers/userR')
const session = require('./server/middleware/session')

MongoServer()
const app = express()
const server = http.createServer(app)
const io = socketio(server)
    // Set static folder
app.use(express.static(path.join(__dirname, 'front')))

//middleware?
app.use(bodyParser.json())
app.use(express.urlencoded({
    extended: true
}))
app.use(express.json())
session(app)

//final attempt at chat
const users = {}

app.use(User(users))

io.on('connection', socket => {
    socket.on('newUser', uname => {
        users[socket.id] = uname
        socket.broadcast.emit('userConnected', uname)
    })
    socket.on('sendMessage', message => {
        socket.broadcast.emit('chatMessage', {
            message: message,
            uname: users[socket.id]
        })
    })
    socket.on('disconnect', () => {
        socket.broadcast.emit('userDisconnected', users[socket.id])
        delete users[socket.id]
    })
})

app.use(express.static('front'))
    //starting server
const PORT = 3000 || process.env.PORT
server.listen(PORT, () => console.log(`Server running on port ${PORT}`))