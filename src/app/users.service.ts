import { Injectable } from '@angular/core';
import { Http } from '@angular/http';

import { BehaviorSubject } from 'rxjs/behaviorsubject';
import { Observable } from 'rxjs/observable'

import 'rxjs/add/operator/map';

import { User } from './user';
import { NewUser } from './new-user';
import { UserCredential } from './user-credential';

class UserRes {
  user: User;
  valid: boolean;
}

@Injectable()
export class UsersService {

  constructor(private http: Http) { }

  getUser(): Observable<UserRes> {
    return this.http.get('/api/token/').map(res => res.json())
  }

  postNewUser(user: NewUser): Promise<User> {
    return this.http.post('/api/users/new/', user).toPromise().then(res => res.json()).catch(this.handleError)
  }

  login(user: UserCredential): void {
    this.http.post('/api/token/', user).toPromise().then(res => res.json()).catch(this.handleError)
  }

  logout(): void {
    this.http.delete('/api/token/').toPromise().then(res => res.json()).catch(this.handleError)
  }

  private handleError(error: any): Promise<any> {
    return Promise.reject(error.message || error)
  }
}
