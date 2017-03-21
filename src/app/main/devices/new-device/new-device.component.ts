import { Component, OnInit } from '@angular/core';

class NewDevice {
  constructor(MAC_address: string, nickname: string) {}
}

@Component({
  selector: 'app-new-device',
  templateUrl: './new-device.component.html',
  styleUrls: ['./new-device.component.css']
})
export class NewDeviceComponent implements OnInit {
  model = new NewDevice('', '');
  constructor() { }

  ngOnInit() {
  }

  handleSubmit() {
    console.log(this.model);
  }
}
