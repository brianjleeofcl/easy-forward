import { Injectable } from '@angular/core';
import { Http } from '@angular/http';

import 'rxjs/add/operator/toPromise';

import { Instruction } from './instruction';

@Injectable()
export class ProjectsService {

  constructor(private http: Http) { }

  startNewProject(instruction: Instruction): Promise<any> {
    return this.http.post('/api/projects/new', instruction).toPromise().then(res => res.json()).catch(this.handleError)
  }

  private handleError(error: any): Promise<any> {
    return Promise.reject(error.message || error)
  }
}
