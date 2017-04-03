import { Component, OnInit } from '@angular/core';

import { UsersService } from './users.service';
import { SocketService } from './socket.service';
import { DevicesService } from './devices.service';
import { User } from './user';
import { Device } from './device';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  user: User;
  logged: boolean;
  devices: Device[];

  constructor(private uS: UsersService, private socket: SocketService, private dS: DevicesService) {
    this.user = new User();
    this.logged = false;
    this.devices = []
  }

  ngOnInit() {
    this.getUser()
    this.uS.authEmit.subscribe(logged => {
      this.logged = logged;
      if (logged) this.getDevices()
    });
  }

  getUser(): void {
    this.uS.getUser()
  };

  getDevices(): void {
    this.dS.getDevices().then(data => this.devices = data)
  }
}
