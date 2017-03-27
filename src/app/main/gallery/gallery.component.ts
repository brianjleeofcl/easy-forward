import { Component, OnInit } from '@angular/core';

import { GalleryService } from '../../gallery.service';

import { Image } from '../../image';

@Component({
  selector: 'app-gallery',
  templateUrl: './gallery.component.html',
  styleUrls: ['./gallery.component.css']
})
export class GalleryComponent implements OnInit {
  images: Image[];

  constructor(private gS: GalleryService) { }

  ngOnInit() {
    this.gS.getImages().then(images => this.images = images)
  }

  stringify(obj: Object): string {
    return JSON.stringify(obj)
  }
}
