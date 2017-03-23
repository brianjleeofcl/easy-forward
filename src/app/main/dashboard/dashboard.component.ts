import { Component, OnInit } from '@angular/core';
import { ProjectsService } from '../../projects.service';

import { Project } from '../../project';

class ProjectsList {
  all: Project[]


  constructor(arr) {
    this.all = arr
  }

  get ongoing() {
    return this.all.filter((project: Project) => !project.recording_completed_at)
  }

  get recordingCompleted () {
    return this.all.filter((project: Project) => project.recording_completed_at && !project.published_url)
  }

  get published() {
    return this.all.filter((project: Project) => project.published_url !== null)
  }
}

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  projects: ProjectsList;
  constructor(private pS: ProjectsService) { }

  ngOnInit() {
    this.pS.getAllProjects().then(arr => this.projects = new ProjectsList(arr));
  }

}
