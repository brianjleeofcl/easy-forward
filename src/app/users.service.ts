import { Injectable } from '@angular/core';
import { Http } from '@angular/http';

import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { Observable } from 'rxjs/Observable';

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
  private auth: BehaviorSubject<boolean> = new BehaviorSubject(false);
  private user: BehaviorSubject<User> = new BehaviorSubject(new User());
  private userInfo: User;
  private authState: boolean;
  authEmit: Observable<boolean>;
  userEmit: Observable<User>;

  constructor(private http: Http) { 
    this.authEmit = this.auth.asObservable();
    this.userEmit = this.user.asObservable();
  }

  private setAuthState (newState: boolean): void {
    this.authState = newState
    this.emitAuthState()
  }

  private setUser (newUser: User): void {
    this.userInfo = newUser;
    this.emitUser()
  }

  emitAuthState(): void {
    this.auth.next(this.authState)
  }

  emitUser(): void {
    this.user.next(this.userInfo)
  }

  getUser(): void {
    this.http.get('/api/token/').map(res => res.json()).subscribe(res => {
      this.setAuthState(res.valid)
      this.setUser(res.user)
    })
  }

  postNewUser(user: NewUser): Promise<User> {
    return this.http.post('/api/users/new/', user).toPromise().then(res => res.json()).catch(this.handleError)
  }

  login(user: UserCredential): void {
    this.http.post('/api/token/', user).map(res => res.json()).subscribe(res => {
      this.setAuthState(res.valid)
      this.setUser(res.user)
    })
  }

  logout(): void {
    this.http.delete('/api/token/').map(res => res.json()).subscribe(res => {
      this.setAuthState(res.valid)
      this.setUser(res.user)
    })
  }

  private handleError(error: any): void {
    console.error(error)
  }
}
