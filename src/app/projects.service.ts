import { Injectable } from '@angular/core';
import { Http } from '@angular/http';

import 'rxjs/add/operator/toPromise';

import { Instruction } from './instruction';
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

  startNewProject(instruction: Instruction): Promise<Project> {
    return this.http.post('/api/projects/new', instruction).toPromise().then(res => res.json()).catch(this.handleError)
  }

  private handleError(error: any): Promise<any> {
    return Promise.reject(error.message || error)
  }
}
