import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { Router } from '@angular/router';

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

  constructor(private uS: UsersService, private title: Title, private router: Router) {
    this.uS.authEmit.subscribe(login => {
      if (login) this.router.navigate(['/'])
    })
  }

  ngOnInit() {
    this.title.setTitle('Log in')
    
  }

  handleSubmit() {
    this.uS.login(this.model)
  }
}
