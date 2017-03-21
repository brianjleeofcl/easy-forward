import { Injectable } from '@angular/core';
import * as io from 'socket.io-client';

@Injectable()
export class SocketService {
  public socket: SocketIOClient.Socket

  constructor() {
    this.socket = io.connect('/')
  }

  onLoad(id: number) {
    console.log(this.socket);
    
    console.log(this.socket.id);
    
    this.socket.emit('initialize-broswer-user', id)
  }
}
