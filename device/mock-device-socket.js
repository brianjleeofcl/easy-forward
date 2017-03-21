const io = require('socket.io-client')
const socket = io.connect('http://localhost:3000')

const MAC = '02:A3:70:35:BC:A6'

socket.on('connect', () => {
  socket.emit('initialize-device-user', MAC)
})

socket.on('instructions', console.log)