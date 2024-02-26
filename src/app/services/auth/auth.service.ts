import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable, catchError, map } from 'rxjs';
import { Router } from '@angular/router';

import { UserInterface } from '../../interfaces/user.interface';
import { FolderInterface } from '../../interfaces/folder.interface';
import { FileInterface } from '../../interfaces/file.interface';

import { ResponseInterface } from '../../interfaces/response.interface';
import { map as mapRx, first, tap} from "rxjs/operators";

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  url: string = 'http://localhost:3000';
  userId: string = "";
  isUserLoggedIn = new BehaviorSubject<boolean>(false);

  constructor(private http: HttpClient, private router: Router) { 
    
  }

  handleError(func: string, body?: object, options?: object): string {

    return 'foo';

  };

  testFunc(user: UserInterface): void {
    console.log(user);
  }

  registerUser(user: UserInterface): Observable<UserInterface> {
    return this.http.post<{response: UserInterface, msg: string}>(`${this.url}/api/auth/register`, user)
    .pipe(
      mapRx((response: {response: UserInterface, msg: string}) => response.response)
      ) as Observable<UserInterface>;
  }

  registerUserRetrieveMessage(user: UserInterface): Observable<{response: UserInterface, msg: string}> {
    return this.http.post<{response: UserInterface, msg: string}>(`${this.url}/api/auth/register`, user) as Observable<{response: UserInterface, msg: string}>
  }

  confirmEmail(token: string): Observable<UserInterface> {
    return this.http.put<{response: UserInterface, msg: string}>(`${this.url}/api/auth/confirmEmail/${token}`, {} )
    .pipe(
      mapRx((response: {response: UserInterface, msg: string}) => response.response)
    ) as Observable<UserInterface>;
  }

  loginUser(login : {email: string, password: string}): Observable<{
    token: string, 
    userId: string,
    first_name: string, 
    last_name: string, 
    email: string, 
    root_folder: string, 
    recovery_email: string
  }> {
    return this.http.post<{response:{
      token: string, 
      userId: string,
      first_name: string, 
      last_name: string, 
      email: string, 
      root_folder: string, 
      recovery_email: string
    }, msg: string}>
    (`${this.url}/api/auth/login`, login )
    .pipe(
      first(),
      tap((response: {response: {
        token: string, 
        userId: string,
        first_name: string, 
        last_name: string, 
        email: string, 
        root_folder: string, 
        recovery_email: string
      }, msg:string}) => {
        this.userId = response.response.userId;

        localStorage.clear();

        localStorage.setItem("token", response.response.token);
        localStorage.setItem("user_id", response.response.userId);
        localStorage.setItem("email", response.response.email);
        localStorage.setItem("root_folder", response.response.root_folder);
        localStorage.setItem("recovery_email", response.response.recovery_email);
        localStorage.setItem("first_name", response.response.first_name);
        localStorage.setItem("last_name", response.response.last_name);

        this.isUserLoggedIn.next(true);
        this.router.navigateByUrl('/home');
      }),
      mapRx((response: {response: {token: string, userId: string}, msg: string}) => response.response)
    ) as Observable<{
      token: string, 
      userId: string,
      first_name: string, 
      last_name: string, 
      email: string, 
      root_folder: string, 
      recovery_email: string
    }>;
  }
  
  getAllUsers(): Observable<UserInterface[]> {
    return this.http.get<{response: UserInterface[], msg: string}>(`${this.url}/api/users`)
    .pipe(
      mapRx((response: {response: UserInterface[], msg: string}) => response.response)
    ) as Observable<UserInterface[]>;
  }

  validateToken(token: string): Observable<{isValid: boolean, msg: string}> {
    return this.http.post<{isValid: boolean, msg: string}>(`${this.url}/api/auth/validateToken`, {token}) as Observable<{isValid: boolean, msg: string}>;
  }
  
}
