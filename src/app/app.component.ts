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
    this.getDevices()
  }

  getUser(): void {
    this.uS.getUser().then(userRes => {
      this.user = userRes.user;
      this.logged = userRes.valid;

      if(this.logged) {
        console.log(this.user.id);
        
        this.socket.onLoad(this.user.id)
      }
    });
  };

  getDevices(): void {
    this.dS.getDevices().then(data => this.devices = data)
  }
}
