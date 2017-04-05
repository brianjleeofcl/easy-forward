import { Injectable } from '@angular/core';
import * as io from 'socket.io-client';

import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { Observable } from 'rxjs/Observable';

import { UsersService } from './users.service';
import { DevicesService } from './devices.service';

@Injectable()
export class SocketService {
  private preview: BehaviorSubject<string> = new BehaviorSubject('');
  private imgdata: string;
  private socket: any;
  public previewEmitter: Observable<string>;


  constructor(private uS: UsersService, private dS: DevicesService) {
    this.socket = io.connect('/').on('device-update', id => {
      this.dS.getDevices()
      this.dS.getDevice(id)
    }).on('preview-image', base64data => {
      this.imgdata = base64data
      this.updatePreview()
    })

    this.uS.userEmit.subscribe(user => {
      if (user.id) this.onLoad(user.id)
    })

    this.previewEmitter = this.preview.asObservable();
  }

  updatePreview() {
    console.log(this.imgdata);
    
    this.preview.next(this.imgdata)
  }

  onLoad(id: number): void {
    this.socket.emit('initialize-browser-user', id)
  }

  sendInstructions(socket_id: string, interval: number, iteration: number, hash: string): void {
    this.socket.emit('instruction-record', [socket_id, interval, iteration, hash])
  }
}
