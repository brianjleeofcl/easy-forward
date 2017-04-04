import { Injectable } from '@angular/core';
import * as io from 'socket.io-client';

import { UsersService } from './users.service';
import { DevicesService } from './devices.service';

@Injectable()
export class SocketService {
  public socket: any

  constructor(private uS: UsersService, private dS: DevicesService) {
    this.socket = io.connect('/').on('device-update', id => {
      this.dS.getDevices()
      this.dS.getDevice(id)
    })

    this.uS.userEmit.subscribe(user => {
      if (user.id) this.onLoad(user.id)
    })
  }

  onLoad(id: number): void {
    this.socket.emit('initialize-browser-user', id)
  }

  sendInstructions(socket_id: string, interval: number, iteration: number, hash: string): void {
    this.socket.emit('instruction-record', [socket_id, interval, iteration, hash])
  }
}
