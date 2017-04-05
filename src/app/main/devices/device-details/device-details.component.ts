import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { Location } from '@angular/common';
import { Title } from '@angular/platform-browser';
import { Router } from '@angular/router';

import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/switchMap';

import { DevicesService } from '../../../devices.service';
import { SocketService } from '../../../socket.service';
import { ProjectsService } from '../../../projects.service';

import { Device } from '../../../device';
import { CameraInstruction } from '../../../instruction';
import { TimeUnit } from '../../../time-unit';

@Component({
  selector: 'app-device-details',
  templateUrl: './device-details.component.html',
  styleUrls: ['./device-details.component.css']
})
export class DeviceDetailsComponent implements OnInit {
  device: Device;
  model: CameraInstruction;
  submitable: boolean;
  previewData: string;

  constructor(
    private socket: SocketService,
    private dS: DevicesService,
    private pS: ProjectsService,
    private title: Title,
    private route: ActivatedRoute,
    private router: Router,
    private location: Location
  ) { 
    this.device = new Device();
    this.model = new CameraInstruction();
    this.submitable = true;
  }

  ngOnInit() {
    this.route.params.switchMap((params: Params) => this.dS.getDevice(+params['id']))
    .subscribe(device => {
      this.device = device;
      this.title.setTitle(`${device.nickname} — details — Easy Forward`);
    });
    this.socket.previewEmitter.subscribe(data => {
      this.previewData = data;
    })
    this.model.duration_unit_val = TimeUnit.Minute;
    this.model.interval_unit_val = TimeUnit.Second;
  }

  setUnit(target, unit) {
    this.model[target] = unit;
  }

  start(): void {
    const {duration, duration_unit_val, interval, interval_unit_val} = this.model;
    const iteration: number = (duration * duration_unit_val) / (interval * interval_unit_val);

    this.submitable = false;
    this.pS.startNewProject(this.model).then(project => {
      const hash: string = project.hash_id;

      this.socket.sendInstructions(this.device.socket_id, interval * interval_unit_val, iteration, hash);
      
      this.router.navigate(['/devices']);
    })
  }

  get diagnostic() {
    return JSON.stringify(this.model);
  }
}
