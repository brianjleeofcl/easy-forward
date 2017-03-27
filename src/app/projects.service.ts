import { Injectable } from '@angular/core';
import { Http } from '@angular/http';

import 'rxjs/add/operator/toPromise';

import { CameraInstruction } from './instruction';
import { Project } from './project';

@Injectable()
export class ProjectsService {

  constructor(private http: Http) { }

  getAllProjects(): Promise<Project[]> {
    return this.http.get('/api/projects/').toPromise().then(res => res.json()).catch(this.handleError)
  }

  getProject(id: number): Promise<Project> {
    return this.http.get(`/api/projects/${id}`).toPromise().then(res => res.json()).catch(this.handleError)
  }

  startNewProject(instruction: CameraInstruction): Promise<Project> {
    const interval = instruction.interval * instruction.interval_unit_val
    const duration = instruction.duration * instruction.duration_unit_val
    
    return this.http.post('/api/projects/new', {interval, duration}).toPromise().then(res => res.json()).catch(this.handleError)
  }

  private handleError(error: any): Promise<any> {
    return Promise.reject(error.message || error)
  }
}
