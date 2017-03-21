import { Component, OnInit } from '@angular/core';

import { SocketService } from '../../../socket.service'

@Component({
  selector: 'app-device-details',
  templateUrl: './device-details.component.html',
  styleUrls: ['./device-details.component.css'],
  providers: [SocketService]
})
export class DeviceDetailsComponent implements OnInit {
  id: string;

  constructor(private socket: SocketService) { 
    this.id = this.socket.socket.id
  }

  ngOnInit() {
  }


}
