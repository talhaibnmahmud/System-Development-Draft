import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor (private router: Router) {}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {

      const tree: UrlTree = this.router.parseUrl('');
    return this.checkLogin();
  }

  checkLogin(): boolean | UrlTree {

    const tree: UrlTree = this.router.parseUrl('');
    const expiry = localStorage.getItem('expiry');
    const token = localStorage.getItem('token');
    const now = new Date();

    let notLoggedIn = true;

    if(!expiry || !token) return notLoggedIn;

    if(expiry) {
      const expiry_date = new Date(expiry);
      if(now > expiry_date) return notLoggedIn;
    }

    if(token && token.length !== 64) return notLoggedIn;

    return tree;
  }
  
}
