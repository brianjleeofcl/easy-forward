import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { Location } from '@angular/common';

import 'rxjs/add/operator/switchMap';

import { DevicesService } from '../../../devices.service';
import { SocketService } from '../../../socket.service';

import { Device } from '../../../device';

@Component({
  selector: 'app-device-details',
  templateUrl: './device-details.component.html',
  styleUrls: ['./device-details.component.css']
})
export class DeviceDetailsComponent implements OnInit {
  device: Device

  constructor(
    private socket: SocketService,
    private dS: DevicesService,
    private route: ActivatedRoute,
    private location: Location
  ) { 
    this.device = new Device()
  }

  ngOnInit() {
    this.route.params.switchMap((params: Params) => this.dS.getDevice(+params['id']))
      .subscribe(device => this.device = device);
  }

  start(): void {
    this.socket.sendInstructions(this.device.socket_id, 1000, 10)
  }
}
