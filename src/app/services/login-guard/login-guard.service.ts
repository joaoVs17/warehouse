import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { AuthService } from '../auth/auth.service';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LoginGuardService implements CanActivate{

  token: string | null = null;
  isUserLoggedIn: any = false;

  constructor(private router: Router, private auth: AuthService) { }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean | UrlTree | Observable<boolean | UrlTree> | Promise<boolean | UrlTree> {
      return this.checkUserLogin();
  }

  async checkUserLogin() {

    this.token = localStorage.getItem('token');

    if (this.token) {

      this.isUserLoggedIn = await this.auth.validateToken(this.token).toPromise().then(
        res => {
          this.router.navigateByUrl('/home');
          return res?.isValid;
        },
        err => {
          if (err.error.isValid == false && err.status == 400) {
            return err?.error?.isValid;
          }
        }
      )

    }

    
    this.auth.isUserLoggedIn.next(!(this.isUserLoggedIn));


    return this.auth.isUserLoggedIn.getValue();

  }

}
