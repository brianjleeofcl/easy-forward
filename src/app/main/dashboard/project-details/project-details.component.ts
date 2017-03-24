import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { Location } from '@angular/common';

import 'rxjs/add/operator/switchMap';

import { ProjectsService } from '../../../projects.service';

import { Project } from '../../../project';

@Component({
  selector: 'app-project-details',
  templateUrl: './project-details.component.html',
  styleUrls: ['./project-details.component.css']
})
export class ProjectDetailsComponent implements OnInit {
  project: Project;
  selectedFrame: number;

  constructor(
    private pS: ProjectsService,
    private route: ActivatedRoute,
    private location: Location
  ) {
    this.project = new Project();
    this.selectedFrame = 0;
  }

  get frames(): number[] {
    return Array(this.project.last_frame_index || 0 + 1).fill(0).map((_, index: number) => index);
  }

  ngOnInit() {
    this.route.params.switchMap((params: Params) => this.pS.getProject(+params['id']))
      .subscribe(project => this.project = project); 
  }

  selectFrame(number) {
    this.selectedFrame = number
  }

  stringify(obj: any): string {
    return JSON.stringify(obj)
  } 

}
