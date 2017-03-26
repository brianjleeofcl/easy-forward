import { Injectable } from '@angular/core';
import { Http } from '@angular/http';

import 'rxjs/add/operator/toPromise'

@Injectable()
export class GalleryService {

  constructor(private http: Http) { }

  getImages() {
    return this.http.get('/api/images').toPromise().then(res => res.json()).catch(this.handleError)
  }

  getImage(url: string) {
    return this.http.get(`/api/images/${url}`).toPromise().then(res => res.json()).catch(this.handleError)
  }

  private handleError(error: any): Promise<any> {
    return Promise.reject(error.message || error)
  }
}
