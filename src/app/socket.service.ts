import { Injectable } from '@angular/core';
import * as io from 'socket.io-client';

import { UsersService } from './users.service';

@Injectable()
export class SocketService {
  public socket: any

  constructor(private uS: UsersService) {
    this.socket = io.connect('/').on('device-ready', (socket_id, MAC_address) => {
      
    }).on('device-update', () => console.log('device updated'))

    this.uS.userEmit.subscribe(user => {
      if (user !== undefined) this.onLoad(user.id)
    })
  }

  onLoad(id: number): void {
    this.socket.emit('initialize-browser-user', id)
  }

  sendInstructions(socket_id: string, interval: number, iteration: number, hash: string): void {
    this.socket.emit('instruction-record', [socket_id, interval, iteration, hash])
  }
}
