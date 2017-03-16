import { Component, OnInit, Input } from '@angular/core';

import { User } from '../user'

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.css']
})
export class NavComponent implements OnInit {
  @Input()
  user: User;

  constructor() { }

  ngOnInit() {
  }

}
