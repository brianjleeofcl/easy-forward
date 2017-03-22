import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { Location } from '@angular/common';

import 'rxjs/add/operator/switchMap';

import { DevicesService } from '../../../devices.service';
import { SocketService } from '../../../socket.service';

import { Device } from '../../../device';

enum TimeUnit {Second = 1000, Minute = 60000, Hour = 3600000}

class InstructionForm {
  duration: number;
  duration_unit_val: TimeUnit;
  get duration_unit(): string {
    return TimeUnit[this.duration_unit_val]
  }
  set duration_unit(unit: string) {
    this.duration_unit_val = TimeUnit[unit]
  }
  interval: number;
  interval_unit_val: TimeUnit;
  get interval_unit(): string {
    return TimeUnit[this.interval_unit_val]
  }
  set interval_unit(unit: string) {
    this.interval_unit_val = TimeUnit[unit]
  }
}

@Component({
  selector: 'app-device-details',
  templateUrl: './device-details.component.html',
  styleUrls: ['./device-details.component.css']
})
export class DeviceDetailsComponent implements OnInit {
  device: Device;
  model: InstructionForm;

  constructor(
    private socket: SocketService,
    private dS: DevicesService,
    private route: ActivatedRoute,
    private location: Location
  ) { 
    this.device = new Device()
    this.model = new InstructionForm()
  }

  ngOnInit() {
    this.route.params.switchMap((params: Params) => this.dS.getDevice(+params['id']))
      .subscribe(device => this.device = device);
    this.model.duration_unit_val = TimeUnit.Minute;
    this.model.interval_unit_val = TimeUnit.Second;
  }

  setUnit(target, unit) {
    this.model[target] = unit
  }

  start(): void {
    const {duration, duration_unit_val, interval, interval_unit_val} = this.model
    const iteration: number = (duration * duration_unit_val) / (interval * interval_unit_val);
    
    this.socket.sendInstructions(this.device.socket_id, interval * interval_unit_val, iteration)
  }

  get diagnostic() {
    return JSON.stringify(this.model)
  }
}
