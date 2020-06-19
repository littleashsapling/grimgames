//chat socket
const socket = io('ws://localhost:3000')
const messageContainer = document.getElementById('messageView')
const messageForm = document.getElementById('userContainer')
const messageInput = document.getElementById('messageInput')

// Join chatrooms
const uname = prompt('what is your name today?')
appendMessage('You joined')
socket.emit('newUser', uname)

socket.on('chatMessage', data => {
    appendMessage(`${data.uname}: ${data.message}`)
})

socket.on('userConnected', uname => {
    appendMessage(`user connected`)
})

socket.on('userDisconnected', uname => {
    appendMessage(`user disconnected`)
})

messageForm.addEventListener('submit', e => {
    e.preventDefault()
    const message = messageInput.value
    appendMessage(`You: ${message}`)
    socket.emit('sendMessage', message)
    messageInput.value = ''
})

function appendMessage(message) {
    const messageElement = document.createElement('div')
    messageElement.innerText = message
    messageContainer.append(messageElement)
    messageElement.scrollIntoView()
}