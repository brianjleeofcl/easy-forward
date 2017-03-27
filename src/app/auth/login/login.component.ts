import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';

import { UsersService } from '../../users.service';
import { UserCredential } from '../../user-credential';

class Credentials {
  constructor (
    email: string,
    password: string
  ) {}
}

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  model: UserCredential = new UserCredential()

  constructor(private uS: UsersService, private title: Title) { }

  ngOnInit() {
    this.title.setTitle('Log in')
  }

  handleSubmit() {
    this.uS.login(this.model).then(() => {window.location.href= '/'})
  }
}
