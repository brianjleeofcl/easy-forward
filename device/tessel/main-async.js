'use strict';

const five = require('johnny-five');
const Tessel = require('tessel-io');
const tessel = require('tessel')

const fs = require('fs');
const path = require('path');

const io = require('socket.io-client');
const request = require('axios');

const os = require('os');

const av = require('tessel-av');
const camera = new av.Camera({
  width: 640,
  height: 360
});

const board = new five.Board({
  io: new Tessel()
});

board.on('ready', () => {
  const MAC = os.networkInterfaces().eth0[0].mac;
  const socket = io.connect('http://www.easy-fwd.com');
  
  const green = tessel.led[2];
  const blue = tessel.led[3];

  blue.on();
  console.log(MAC);

  socket.on('connect', () => {
    socket.emit('initialize-device-user', [MAC, camera.url]);
    console.log('socket connected:', socket.id);
    blue.off();
    green.on();
  });

  socket.on('device-record', arr => {
    console.log('record instructions received:', arr);
    const interval = arr[0];
    const iteration = arr[1];
    const hash = arr[2];
    let tick = -1;

    green.off();

    board.loop(interval, done => {
      tick++;
      const index = tick;

      if (index >= iteration) {
        console.log('done with all recording');
        done();
        green.on();
        socket.emit('device-record-complete', [socket.id, hash]);
      }

      const indexpad = `000${index}`.slice(-3);
      const writeToLocal = fs.createWriteStream(path.join('/mnt/sda', `${hash}-${indexpad}.jpg`));

      const frame = camera.capture();
      frame.on('data', () => console.log(`${index}: data received`))
        .on('error', err => console.error('Camera: ' + err))
        .on('end', () => console.log(`${index}: data ended`));
      frame.pipe(writeToLocal).on('error', console.error)
        .on('finish', () => {
          console.log(`${index}: writing to flash complete`);
          fs.readFile(path.join('/mnt/sda', `${hash}-${indexpad}.jpg`), (err, data) => {
            if (err) {
              return console.error('File read error');
            }

            console.log(`${index}: file read complete, creating request`);

            request({
              url: `http://www.easy-fwd.com/device-api/post-image/${hash}/${index}`,
              method: 'POST',
              data,
              header: {
                'Content-Type': 'image/jpeg',
                'Content-Encoding': 'base64',
                'Connection': 'Keep-Alive'
              }
            }).then(res => console.log(`${index}: posted, status: ${res.status}`)).catch(console.error)
          });
        });
    });
  });

  socket.on('connect_error', console.error);
  socket.on('reconnect_attempt', () => console.log('reconnecting...'));
  socket.on('reconnection', () => socket.emit('initialize-device-user', MAC));

  board.on('exit', () => {
    blue.off();
    green.off();
  });
});