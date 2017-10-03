import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { Observable } from 'rxjs/Observable';

import { CookieService } from 'ngx-cookie';

import 'rxjs/add/operator/toPromise';
import 'rxjs/add/operator/map';

import { User } from '../user';

@Injectable()
export class AuthUserService {

  base = '/users';
  constructor(private _http: Http, private _cookieService: CookieService) { }

  login(user: User): Promise<User>{
    return this._http.post(`${ this.base }/login`, user)
      .map(res => res.json())
      .toPromise();
  }

  register(user: User): Promise<User>{
    return this._http.post(`${ this.base }/register`, user)
      .map(res => res.json())
      .toPromise();
  }

  logout(): Promise<User>{
    return this._http.delete(`${ this.base }/logout`)
      .map(res => res.json())
      .toPromise();
  }

  isAuthed(): boolean {
    const expired = parseInt(this._cookieService.get('expiration'));
    const userID = this._cookieService.get('userID');
    const session = this._cookieService.get('session');

    return session && expired && userID && expired > Date.now();
  }
}
