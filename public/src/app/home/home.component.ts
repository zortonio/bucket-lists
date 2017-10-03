import { Component, OnInit } from '@angular/core';
import { AuthUserService } from './../services/auth-user.service';
import { Router } from '@angular/router';

import { User } from './../user';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  errorMessages: string[] = [];
  logUser: User = new User();
  regUser: User = new User();

  constructor(private _authUserService: AuthUserService, private _router: Router) { }

  ngOnInit() {
  }

  login(user: User){
    this._authUserService.login(user)
      .then(() => this._router.navigate(['dashboard']))
      .catch(res => {
        this.errorMessages[0] = res.json();
      });
  }

  register(user: User): void {
    this._authUserService.register(user)
      .then(() => this._router.navigate(['dashboard']))
      .catch(res => {
        this.handleErrors(res.json());
      });
  }

  handleErrors(errors: string[] | Error): void {
    this.errorMessages = Array.isArray(errors) ? errors: [errors.message];
  }

}
