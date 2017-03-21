import { Component, OnInit } from '@angular/core';

import { UsersService } from './users.service';
import { SocketService } from './socket.service';
import { User } from './user';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  providers: [UsersService, SocketService]
})
export class AppComponent implements OnInit {
  user: User;
  logged: boolean;

  constructor(private uS: UsersService, private socket: SocketService) {
    this.user = new User();
    this.logged = false;
  }

  ngOnInit() {
    this.getUser()
  }

  getUser(): void {
    this.uS.getUser().then(userRes => {
      this.user = userRes.user;
      this.logged = userRes.valid;

      if(this.logged) {
        this.socket.connect().emit('initialize-browser-user', this.user.id)
      }
    });
  };
}
