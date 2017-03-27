import { Injectable } from '@angular/core';
import { Http } from '@angular/http';

import 'rxjs/add/operator/toPromise';

import { Image } from './image';
import { PublishingInstruction } from './instruction';

@Injectable()
export class GalleryService {

  constructor(private http: Http) { }

  getImages(): Promise<Image[]> {
    return this.http.get('/api/images').toPromise().then(res => res.json()).catch(this.handleError)
  }

  getImage(url: string): Promise<Image> {
    return this.http.get(`/api/images/${url}`).toPromise().then(res => res.json()).catch(this.handleError)
  }

  publishToGallery(instructions: PublishingInstruction) {
    return this.http.post(`/api/images/new/`, instructions).toPromise().then(res => res.json()).catch(this.handleError)
  }

  private handleError(error: any): Promise<any> {
    return Promise.reject(error.message || error)
  }
}
