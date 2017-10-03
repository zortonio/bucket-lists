import { Injectable } from '@angular/core';
import { CanActivate, Router, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { AuthUserService } from './auth-user.service';

@Injectable()
export class AuthGuardService implements CanActivate {

  constructor(private _authUserService: AuthUserService, private _router: Router) { }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean{
    let url: String = state.url;
    return this.checkLogin(url);
  }

  checkLogin(url: String): boolean{
    if(this._authUserService.isAuthed()){return true;}
    this._router.navigate(['']);
    return false;
  }

}
