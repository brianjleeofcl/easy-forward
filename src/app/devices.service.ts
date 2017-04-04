import { Injectable } from '@angular/core';
import { Http } from '@angular/http';

import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { Observable } from 'rxjs/Observable';

import 'rxjs/add/operator/map';

import { Device } from './device'

@Injectable()
export class DevicesService {
  private devicesSubject: BehaviorSubject<Device[]> = new BehaviorSubject([])
  private devices: Device[]
  devicesEmitter: Observable<Device[]>
  constructor(private http: Http) {
    this.devicesEmitter = this.devicesSubject.asObservable();
  }

  private setDevices(devicesArray: Device[]) {
    this.devices = devicesArray
    this.emitDevices()
  }

  emitDevices() {
    this.devicesSubject.next(this.devices)
  }

  getDevices(): void {
    this.http.get('/api/devices/').map(res => res.json()).subscribe(res => this.setDevices(res))
  }

  getDevice(id: number): Observable<Device> {
    return this.http.get(`/api/devices/${id}`).map(res => res.json())
  }

  addNewDevice(newDevice): Promise<Device> {
    return this.http.post('/api/devices/new', newDevice).toPromise().then(res => res.json()).catch(this.handleError)
  }

  private handleError(error: any): Promise<any> {
    return Promise.reject(error.message || error)
  }
}
