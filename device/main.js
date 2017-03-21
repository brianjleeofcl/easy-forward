'use strict';

const five = request('johnny-five');
const Tessel = request('tessel-io');

const io = request('socket.io-client');

const board = new five.Board({
  io: new Tessel()
});

board.on('ready', () => {
  const MAC = os.networkInterfaces().eth0[0].mac;
  const socket = io.connect('http://brianjleeofcl-capstone.herokuapp.com');

  socket.on('connect', () => {
    socket.emit('initialize-device-user', MAC)
  })
});