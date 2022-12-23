import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';

import { Observable, first, map } from 'rxjs';
import { UserModel } from 'src/app/auth/+store/models';

@Injectable({
  providedIn: 'root'
})
export class IsAuthenticatedGuard implements CanActivate {

  constructor(
    private userModel: UserModel,
    private router: Router
  ) { }

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {

    return this.userModel.isLoggedIn$.pipe(
      first(),
      map(isAuthenticated => {
        return isAuthenticated
          ? true
          : this.router.createUrlTree(['/auth/login']);
      })
    );
  }
}
