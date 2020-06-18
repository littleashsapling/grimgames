//backend server
const path = require('path')
const http = require('http')
const express = require('express')
const bodyParser = require('body-parser')
const socketio = require('socket.io')
const MongoServer = require('./server/db')
const User = require('./server/routers/userR')

const formatMessage = require('./util/message')
const {
    userJoin,
    getCurrentUser,
    userLeave,
    getRoomUsers
} = require('./util/user')
const userSocketHandler = require('./util/user')

MongoServer()
const app = express()
const server = http.createServer(app)
const io = socketio(server)

// Set static folder
app.use(express.static(path.join(__dirname, 'front')))

const botName = 'Chat Bot'

//middleware?
app.use(bodyParser.json())
app.use(express.urlencoded({
    extended: true
}))
app.use(express.json())


app.use(User)

// Run when client connects
io.on('connection', socket => {
    socket.on('joinRoom', ({
        username,
        room
    }) => {
        const user = userSocketHandler.userJoin(socket.id, username, room);

        socket.join(user.room)

        // Welcome current user
        socket.emit('message', formatMessage(botName, 'Welcome!'));

        // Broadcast when a user connects
        socket.broadcast
            .to(user.room)
            .emit(
                'message',
                formatMessage(botName, `${user.username} has joined the chat`)
            )

        // Send users and room info
        io.to(user.room).emit('roomUsers', {
            room: user.room,
            users: getRoomUsers(user.room)
        })
    })

    // Listen for chatMessage
    socket.on('chatMessage', msg => {
        const user = getCurrentUser(socket.id)

        io.to(user.room).emit('message', formatMessage(user.username, msg))
    });

    // Runs when client disconnects
    socket.on('disconnect', () => {
        const user = userLeave(socket.id)

        if (user) {
            io.to(user.room).emit(
                'message',
                formatMessage(botName, `${user.username} has left the chat`)
            )

            // Send users and room info
            io.to(user.room).emit('roomUsers', {
                room: user.room,
                users: getRoomUsers(user.room)
            })
        }
    })
})

app.use(express.static('front'))
    //starting server
const PORT = 3000 || process.env.PORT
server.listen(PORT, () => console.log(`Server running on port ${PORT}`))