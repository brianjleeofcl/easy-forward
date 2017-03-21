import { Injectable } from '@angular/core';
import { Http } from '@angular/http'
import { Subject } from 'rxjs/Subject';

import { Device } from './device'

@Injectable()
export class DevicesService {

  constructor(private http: Http) { }

  getDevices(): Promise<Device[]> {
    return this.http.get('/api/devices/').toPromise().then(res => res.json()).catch(this.handleError)
  }

  addNewDevice(newDevice): Promise<Device> {
    return this.http.post('/api/devices/new', newDevice).toPromise().then(res => res.json()).catch(this.handleError)
  }

  private handleError(error: any): Promise<any> {
    return Promise.reject(error.message || error)
  }
}
