import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { Location } from '@angular/common';
import { Title } from '@angular/platform-browser';

import 'rxjs/add/operator/switchMap';

import { ProjectsService } from '../../../projects.service';
import { GalleryService } from '../../../gallery.service';

import { Project } from '../../../project';
import { PublishingInstruction } from '../../../instruction';

@Component({
  selector: 'app-project-details',
  templateUrl: './project-details.component.html',
  styleUrls: ['./project-details.component.css']
})
export class ProjectDetailsComponent implements OnInit {
  project: Project;
  selectedFrame: number;
  fps: number;
  title: string;
  clicked: boolean = false;

  constructor(
    private pS: ProjectsService,
    private gS: GalleryService,
    private route: ActivatedRoute,
    private router: Router,
    private location: Location,
    private pageTitle: Title
  ) {
    this.project = new Project();
    this.selectedFrame = 0;
    this.fps = 10;
    this.title = '';
  }

  get frames(): number[] {
    return Array(this.project.last_frame_index || 0 + 1).fill(0).map((_, index: number) => index);
  }

  ngOnInit() {
    this.route.params.switchMap((params: Params) => this.pS.getProject(+params['id']))
      .subscribe(project => this.project = project);
    this.pageTitle.setTitle('Easy Forward')
  }

  selectFrame(number) {
    this.selectedFrame = number
  }

  publish() {
    this.clicked = true
    const instruction: PublishingInstruction = {
      url: this.project.hash_id,
      delay: Math.round(100 / this.fps),
      title: this.title,
      last_frame_index: this.project.last_frame_index
    }
    this.gS.publishToGallery(instruction).then(({url}) => {
      this.router.navigate(['/details', url])
    })
  }

  stringify(obj: any): string {
    return JSON.stringify(obj)
  } 

}
