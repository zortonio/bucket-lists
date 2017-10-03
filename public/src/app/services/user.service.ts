import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/observable';
import { Http } from '@angular/http';

import { CookieService } from 'ngx-cookie';

import { Item } from './../item';
import { User } from './../user';

@Injectable()
export class UserService {

  user: User;

  constructor(private _http: Http, private _cookieService: CookieService) { }

  current(callback){
    return this._http.get(`users/current`).subscribe(
      (response) => {
        this.user = response.json();
        callback(this.user);
      },
      (err) => {
        console.log(err);
      }
    )
  }

  retrieveUsers(): Promise<User[]>{
    return this._http.get('users/all')
      .map(res => res.json())
      .toPromise();
  }

  retrieveUser(id){
    return this._http.get('users/info/'+id)
      .map(res => res.json())
      .toPromise();
  }

  addItem(item){
    this._http.post('/items/add', item)
      .map(res => res.json())
      .toPromise();
  }

  changeStatus(item){
    this._http.put('/items/status/change', item)
      .map(res => res.json())
      .toPromise();
  }
}
