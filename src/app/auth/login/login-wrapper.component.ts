import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-login-wrapper',
  template: `<button type="button" class="btn btn-primary" placement="bottom" [ngbPopover]="login">Login/Signup</button><template #login><app-login></app-login></template>`,
  styleUrls: ['./login.component.css']
})
export class LoginWrapperComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

}
