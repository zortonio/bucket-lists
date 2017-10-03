import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthUserService } from './../services/auth-user.service';
import { UserService } from './../services/user.service';

import { User } from './../user';
import { Item } from './../item';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  user: User = new User();
  users = [];
  item: Item = new Item();

  constructor(private _authUserService: AuthUserService, private _router: Router, private _userService: UserService) { }

  ngOnInit() {
    this.currentUser();
    this.getUsers();
  }

  logout(){
    this._authUserService.logout()
      .then(() => this._router.navigate(['']))
      .catch();
  }

  currentUser(){
    this._userService.current((user) => {
      this.user = user;
    })
  }

  getUsers(){
    this._userService.retrieveUsers()
      .then(res => this.users = res)
      .catch();
  }

  addItem(){
    this._userService.addItem(this.item);
    this.currentUser();
  }

  changeStatus(index, status){
    let item = {};
    if(status === 'Pending'){
       item = {index: index, status: 'Done'}
    }else{
      item = {index: index, status: 'Pending'}
    }
    this._userService.changeStatus(item);
  }

}
