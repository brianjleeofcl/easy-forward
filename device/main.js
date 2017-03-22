'use strict';

const five = require('johnny-five');
const Tessel = require('tessel-io');

const fs = require('fs');
const path = require('path');

const io = require('socket.io-client');
const request = require('request');

const os = require('os');

const av = require('tessel-av');
const camera = new av.Camera({ width: 720, height: 540 })

const board = new five.Board({
  io: new Tessel()
});

board.on('ready', () => {
  const MAC = os.networkInterfaces().eth0[0].mac;
  const socket = io.connect('http://brianjleeofcl-capstone.herokuapp.com');

  socket.on('connect', () => {
    socket.emit('initialize-device-user', MAC)
  });

//destructuring not supported?
  socket.on('record', (arr) => {
    const interval = arr[0]
    const iteration = arr[1]
    let index = 0;

    board.loop(interval, done => {
      if (index > iteration) {
        done()
        socket.emit('recording-complete')
      }
      const time = Date.now();

      camera.capture()
      .pipe(fs.createWriteStream(path.join('/mnt/sda', `${time}.jpg`)))
      .on('finish', () => {
        fs.createReadStream(path.join('/mnt/sda', `${time}.jpg`))
          .pipe(request.post('http://brianjleeofcl-endpoint-test.herokuapp.com/upload'))
        console.log(`${time}.jpg`);
        socket.send(`${time}.jpg`);
      })
      index++
    })
  })
});