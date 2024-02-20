import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, catchError, map } from 'rxjs';

import { UserInterface } from '../../interfaces/user.interface';
import { FolderInterface } from '../../interfaces/folder.interface';
import { FileInterface } from '../../interfaces/file.interface';

import { ResponseInterface } from '../../interfaces/response.interface';
import { map as mapRx} from "rxjs/operators";

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  url: string = 'http://localhost:3000';

  constructor(private http: HttpClient) { 

  }

  handleError(func: string, body?: object, options?: object): string {

    return 'foo';

  };

  registerUser(user: UserInterface): Observable<UserInterface[]> {
    return this.http.post<{response: UserInterface[], msg: string}>(`${this.url}/api/auth/register`, user)
    .pipe(
      mapRx((response: {response: UserInterface[], msg: string}) => response.response)
      ) as Observable<UserInterface[]>;
  }

  confirmEmail(token: string): Observable<UserInterface> {
    return this.http.put<{response: UserInterface, msg: string}>(`${this.url}/api/auth/confirmEmail/${token}`, {} )
    .pipe(
      mapRx((response: {response: UserInterface, msg: string}) => response.response)
    ) as Observable<UserInterface>;
  }

  loginUser(email: string, password: string): Observable<string> {
    return this.http.post<{response: string, msg: string}>(`${this.url}/api/auth/login`, {email, password} )
    .pipe(
      mapRx((response: {response: string, msg: string}) => response.response)
    ) as Observable<string>;
  }
  


}
