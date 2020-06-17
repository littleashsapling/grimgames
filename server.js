//backend server
const path = require('path')
const express = require('express')
const http = require('http')
var bodyParser = require('body-parser')
    //static folder
const app = express()
const server = http.createServer(app)
app.use(express.static(path.join(__dirname, 'front')))
    //database
const mongoose = require('mongoose')

mongoose.connect('mongodb+srv://admin:admin@grimgames-7mfso.mongodb.net/chatandrooms?retryWrites=true&w=majority', (err) => {
    console.log('mongodb connected!', err)
})

//starting server
const PORT = 3000 || process.env.PORT
app.listen(PORT, () => console.log('Server running on port ${PORT}'))