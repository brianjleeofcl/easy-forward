import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';

import { UsersService } from '../../users.service'

import { NewUser } from '../../new-user';

class NewUserForm {
  constructor(
    public user: NewUser,
    public verify: string
  ) {}
};

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.css']
})
export class SignUpComponent implements OnInit {
  model: NewUserForm = new NewUserForm(new NewUser(), '');

  constructor(private uS: UsersService, private title: Title) { }

  ngOnInit() {
    this.title.setTitle('Sign up')
  }

  handleSubmit() {
    this.uS.postNewUser(this.model.user).then(() => {window.location.href = '/'})
  }
}