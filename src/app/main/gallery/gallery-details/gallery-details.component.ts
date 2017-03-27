import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { Location } from '@angular/common';
import { Title } from '@angular/platform-browser';

import 'rxjs/add/operator/switchMap';

import { GalleryService } from '../../../gallery.service';

import { Image } from '../../../image';

@Component({
  selector: 'app-gallery-details',
  templateUrl: './gallery-details.component.html',
  styleUrls: ['./gallery-details.component.css']
})
export class GalleryDetailsComponent implements OnInit {
  image: Image;

  constructor(
    private gS: GalleryService,
    private title: Title,
    private route: ActivatedRoute,
    private router: Router,
    private location: Location
  ) {
    this.image = new Image()
  }

  ngOnInit() {
    this.route.params.switchMap((params: Params) => this.gS.getImage(params['url']))
      .subscribe(image => {
        this.image = image
        this.title.setTitle(`View ${image.title}`)
      }); 
  }

}
