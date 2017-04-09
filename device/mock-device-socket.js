// For testing. Run node device/mock-device-socket.js to mimick the board behavior in the development environment and confirm that socket connections are running correctly.

const io = require('socket.io-client')
const socket = io.connect('http://localhost:3000')

const MAC = '02:a3:70:35:bc:a6'

socket.on('connect', () => {
  socket.emit('initialize-device-user', MAC)
})

socket.on('device-record', ([interval, iteration]) => {
  let index = 0
  let intervalId = setInterval(() => {
    console.log(Date.now(), '-', index)
    index++
    if (index === iteration) {
      clearInterval(intervalId)
      socket.emit('device-record-complete')
    }
  }, interval)
})