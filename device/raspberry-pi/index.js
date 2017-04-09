const fs = require('fs');
const path = require('path');
const { spawn, spawnSync } = require('child_process');

const io = require('socket.io-client');
const request = require('axios');

const getSerial = function() {
  const data = fs.readFileSync('/proc/cpuinfo', 'utf8');
  const arr = data.split('\n');
  const serialLine = arr[arr.length - 2];
  const serial = serialLine.split(':');
  return serial[1].slice(1);
}
const serial = getSerial()
console.log(`ezfwd-pi| serial: ${serial}`)

const getIp = function() {
  return spawnSync('hostname', ['-I']).stdout
}
const ip = getIp()
console.log(`ezfwd-pi| ip: ${ip}`)

const preview = function() {
  return spawn('raspistill', ['-w', '256', '-h', '144', '-vf', '-hf', '-o', filepath('preview', 0)])
}

let previewLoop

const socket = io.connect('http://www.easy-fwd.com')
socket.on('connect', () => {
  console.log(`connected to socket ${socket.id}`)
  socket.emit('initialize-device-user', ['pi', serial, null])

  previewLoop = setInterval(() => {
    preview().on('exit', () => {
      fs.readFile(filepath('preview', 0), 'base64', (err, data) => {
        socket.emit('device-preview-image', [socket.id, data])
      })
    })
  }, 5000)
})

const filename = function(hash, num) {
  const index = `000${num}`.slice(-3)
  return `${hash}-${index}.jpg`
}

const filepath = function(hash, num) {
  return path.join('/media', 'pi', '42B4-3100', filename(hash, num))
}

const img = function(hash, num) {
  return spawn('raspistill', ['-w', '848', '-h', '480', '-vf', '-hf', '-o', filepath(hash, num)])
}

socket.on('device-record', ([interval, iteration, hash]) => {
  clearInterval(previewLoop)
  let tick = 0;

  let period = setInterval(() => {
    const num = tick
    if (num > iteration) {
      socket.emit('device-upload-complete', [socket.id, hash])
      return clearInterval(period)
    }
    img(hash, num).on('exit', function (code) {
      if (code) throw new Error(`ERR: exit with code ${code}`)
      fs.readFile(filepath(hash, num), (err, data) => {
        if (err) console.error(err)
        request({
          url: `http://www.easy-fwd.com/device-api/post-image/${hash}/${num}`,
          method: 'POST',
          data,
          header: {
            'Content-Type': 'image/jpeg',
            'Content-Encoding': 'base64',
            'Connection': 'Keep-Alive'
          }
        })
      })
    })

    tick++

  }, interval)
})