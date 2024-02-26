import { Injectable } from '@angular/core';
import { AuthService } from '../auth/auth.service';
import { ActivatedRouteSnapshot, Route, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { CanActivate } from '@angular/router';
import { Observable, map as mapRx } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthGuardService implements CanActivate {

  token: string | null = null;
  isUserLoggedIn: any = false;
  
  constructor(private auth: AuthService, private router: Router) {
    
   }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean | UrlTree | Observable<boolean | UrlTree> | Promise<boolean | UrlTree> {

    return this.checkUserLogin();

   }

   async checkUserLogin(): Promise<boolean> {

    this.token = localStorage.getItem('token');

    if (this.token) {

      this.isUserLoggedIn = await this.auth.validateToken(this.token).toPromise().then(
        res => {
          return res?.isValid;
        },
        err => {
          if (err.error.isValid == false && err.status == 400) {
            this.router.navigateByUrl('/signin')
            return err?.error?.isValid;
          }
        }
      )

    }

    this.auth.isUserLoggedIn.next(this.isUserLoggedIn);


    return this.auth.isUserLoggedIn.getValue();

   }

}
