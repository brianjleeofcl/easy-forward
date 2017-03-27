import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';

import { DevicesService } from '../../devices.service';

import { Device } from '../../device'

@Component({
  selector: 'app-devices',
  templateUrl: './devices.component.html',
  styleUrls: ['./devices.component.css']
})
export class DevicesComponent implements OnInit {
  devices: Device[];

  constructor(private dS: DevicesService, private title: Title) {
    this.devices = []
  }

  ngOnInit() {
    this.getData()
    this.title.setTitle('Devices summary')
  }

  getData(): void {
    this.dS.getDevices().then(data => this.devices = data)
  }

}
