import { Injectable } from '@angular/core';
import * as io from 'socket.io-client';

@Injectable()
export class SocketService {
  public socket: any

  constructor() {
    this.socket = io.connect('/').on('device-ready', (socket_id, MAC_address) => {
      
    }).on('device-update', () => console.log('device updated'))
  }

  onLoad(id: number): void {
    this.socket.on('connect', () => this.socket.emit('initialize-browser-user', id))
  }

  sendInstructions(socket_id: string, interval: number, iteration: number, hash: string): void {
    this.socket.emit('instruction-record', [socket_id, interval, iteration, hash])
  }
}
