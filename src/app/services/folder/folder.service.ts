import { Injectable } from '@angular/core';

import { FolderInterface } from '../../interfaces/folder.interface';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import {map as mapRx} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class FolderService {

  url: string = 'http://localhost:3000';

  constructor(private http: HttpClient) { 

  }

  getFolders(): Observable<FolderInterface[]>{
    return this.http.get<{response: FolderInterface[], msg: string}>(`${this.url}/api/folders`)
    .pipe(
      mapRx((response: {response: FolderInterface[], msg: string}) => response.response)
    ) as Observable<FolderInterface[]>;
  }
  
  createFolder(folder: FolderInterface): Observable<FolderInterface> {
    return this.http.get<{response: FolderInterface, msg: string}>(`${this.url}/api/folders`)
    .pipe(
      mapRx((response: {response: FolderInterface, msg: string}) => response.response)
    ) as Observable<FolderInterface>;
  }

  deleteFolder(folderId: string): Observable<FolderInterface> {
    return this.http.delete<{response: FolderInterface, msg: string}>(`${this.url}/api/folders/${folderId}`)
    .pipe(
      mapRx((response: {response: FolderInterface, msg: string}) => response.response)
    ) as Observable<FolderInterface>;
  }


  

}
