//backend server
const express = require('express')
var bodyParser = require('body-parser')
const app = express()
const apiPort = 3000
    //database
const mongoose = require('mongoose')

mongoose.connect('mongodb+srv://admin:admin@grimgames-7mfso.mongodb.net/chatandrooms?retryWrites=true&w=majority', (err) => {
    console.log('mongodb connected!', err)
})

var user = mongoose.user('User', {

})
var Message = mongoose.model('Message', {
    name: String,
    message: String
})


//bodyparser
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({
    extended: false
}))

app.get('/messages', (req, res) => {
    Message.find({}, (err, messages) => {
        res.send(messages);
    })
})


app.get('/messages/:user', (req, res) => {
    var user = req.params.user
    Message.find({
        name: user
    }, (err, messages) => {
        res.send(messages);
    })
})


app.post('/messages', async(req, res) => {
        try {
            var message = new Message(req.body);

            var savedMessage = await message.save()
            console.log('saved');

            var censored = await Message.findOne({
                message: 'badword'
            });
            if (censored)
                await Message.remove({
                    _id: censored.id
                })
            else
                io.emit('message', req.body);
            res.sendStatus(200);
        } catch (error) {
            res.sendStatus(500);
            return console.log('error', error);
        } finally {
            console.log('Message Posted')
        }

    })
    //starting server
app.listen(apiPort, () => console.log('Server running on port ${apiPort}'))