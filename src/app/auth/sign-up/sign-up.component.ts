import { Component, OnInit } from '@angular/core';

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
  styleUrls: ['./sign-up.component.css'],
  providers: [UsersService]
})
export class SignUpComponent implements OnInit {
  model: NewUserForm = new NewUserForm(new NewUser(), '');

  constructor(private uS: UsersService) { }

  ngOnInit() {
  }

  handleSubmit() {
    this.uS.postNewUser(this.model.user).then(() => {window.location.href = '/'})
  }
}