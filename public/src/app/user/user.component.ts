import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthUserService } from './../services/auth-user.service';
import { UserService } from './../services/user.service';

import { CookieService } from 'ngx-cookie';

import { User } from './../user';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class UserComponent implements OnInit {

  user: User;
  currentUserId;

  constructor(private _authUserService: AuthUserService, private _userService: UserService, private _router: Router, private _route: ActivatedRoute, private _cookieService: CookieService) {
    this._route.paramMap.subscribe( params => {
      this.getItems(params.get('id'));
      this.currentUserId = this._cookieService.get('userID');
    })
  }

  ngOnInit() {
  }

  logout() {
    this._authUserService.logout()
      .then(() => this._router.navigate(['']))
      .catch();
  }

  getItems(id){
    this._userService.retrieveUser(id)
      .then(res => {this.user = res; console.log(this.user)})
      .catch();
  }

  changeStatus(index, status) {
    let item = {};
    if (status === 'Pending') {
      item = { index: index, status: 'Done' }
    } else {
      item = { index: index, status: 'Pending' }
    }
    this._userService.changeStatus(item);
  }

}
