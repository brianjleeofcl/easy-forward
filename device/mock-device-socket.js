const io = require('socket.io-client')
const socket = io.connect('http://localhost:3000')

const MAC = '02:a3:70:35:bc:a6'

socket.on('connect', () => {
  socket.emit('initialize-device-user', MAC)
})

socket.on('instructions', console.log)

socket.on('record', ([interval, iteration]) => {
  let index = 0
  let intervalId = setInterval(() => {
    console.log(Date.now(), '-', index)
    index++
    if (index === iteration) {
      clearInterval(intervalId)
      socket.emit('recording-complete')
    }
  }, interval)
})