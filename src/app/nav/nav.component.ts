import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

import { UsersService } from '../users.service'

import { User } from '../user';
import { Device } from '../device'

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.css'],
  providers: [UsersService]
})
export class NavComponent implements OnInit {
  @Input() user: User;
  @Input() logged: boolean;
  @Input() devices: Device[];
  @Output() logoutRequest = new EventEmitter<any>();

  constructor(private uS: UsersService) { }

  ngOnInit() {
  }

  logout() {
    this.uS.logout().then(() => window.location.href = '/')
  }
}
