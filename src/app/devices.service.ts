import { Injectable } from '@angular/core';
import { Http } from '@angular/http';

import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { Observable } from 'rxjs/Observable';

import 'rxjs/add/operator/map';

import { Device } from './device'

@Injectable()
export class DevicesService {
  private devicesSubject: BehaviorSubject<Device[]> = new BehaviorSubject([])
  private deviceSubject: BehaviorSubject<Device> = new BehaviorSubject(new Device())
  private device: Device
  private devices: Device[]
  devicesEmitter: Observable<Device[]>
  deviceEmitter: Observable<Device>
  constructor(private http: Http) {
    this.devicesEmitter = this.devicesSubject.asObservable();
    this.deviceEmitter = this.deviceSubject.asObservable();
  }

  private setDevices(devicesArray: Device[]) {
    this.devices = devicesArray
    this.emitDevices()
  }

  private setDevice(device: Device) {
    this.device = device
    this.emitDevice()
  }

  emitDevices() {
    this.devicesSubject.next(this.devices)
  }

  emitDevice(){
    this.deviceSubject.next(this.device)
  }

  getDevices(): void {
    this.http.get('/api/devices/').map(res => res.json()).subscribe(res => this.setDevices(res))
  }

  getDevice(id: number): void {
    this.http.get(`/api/devices/${id}`).map(res => res.json()).subscribe(res => this.setDevice(res))
  }

  addNewDevice(newDevice): Promise<Device> {
    return this.http.post('/api/devices/new', newDevice).toPromise().then(res => res.json()).catch(this.handleError)
  }

  private handleError(error: any): Promise<any> {
    return Promise.reject(error.message || error)
  }
}
