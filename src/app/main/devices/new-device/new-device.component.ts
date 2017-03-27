import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';

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
  constructor(private title: Title) { }

  ngOnInit() {
    this.title.setTitle('Add new device')
  }

  handleSubmit() {
    console.log(this.model);
  }
}
