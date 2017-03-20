import { Injectable } from '@angular/core';
import { Http } from '@angular/http';

import 'rxjs/add/operator/toPromise';

import { User } from './user';
import { NewUser } from './new-user';

class UserRes {
  user: User;
  valid: boolean;
}

class Credentials {
  email: string;
  password: string;
}

@Injectable()
export class UsersService {

  constructor(private http: Http) { }

  getUser(): Promise<UserRes> {
    return this.http.get('/api/token/').toPromise().then(res => res.json()).catch(this.handleError)
  }

  postNewUser(user: NewUser): Promise<User> {
    return this.http.post('/api/users/new/', user).toPromise().then(res => res.json()).catch(this.handleError)
  }

  login(user: Credentials): Promise<any> {
    return this.http.post('/api/token/', user).toPromise().then(res => res.json()).catch(this.handleError)
  }

  logout(): Promise<boolean> {
    return this.http.delete('/api/token/').toPromise().then(res => res.json()).catch(this.handleError)
  }

  private handleError(error: any): Promise<any> {
    return Promise.reject(error.message || error)
  }
}
