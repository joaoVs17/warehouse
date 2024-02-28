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
  };

  getUserFolders(): Observable<{response: FolderInterface[], msg: string}> | void {

  };

  getFoldersFromFolder(user_id: string, parent_id: string): Observable<FolderInterface[]> {
  
    return this.http.get<{response: FolderInterface[], msg: string}>(`${this.url}/api/folders/user/${user_id}/parent/${parent_id}`)
    .pipe(
      mapRx((response: {response: FolderInterface[], msg: string}) => {
        return response.response;
      })
    ) as Observable<FolderInterface[]>;
  }

  getFolderParentList(folder_id: string): Observable<{name: string, id: string, parent_id: string}[]> {
    return this.http.get<{response: {name: string, id: string, parent_id: string}[], msg: string}>(`${this.url}/api/folders/parents/${folder_id}`)
    .pipe(
      mapRx((response: {response: {name: string, id: string, parent_id: string}[], msg: string}) => response.response)
    ) as Observable<{name: string, id: string, parent_id: string}[]>
  }
  
  createFolder(folder: FolderInterface): Observable<FolderInterface> {
    return this.http.get<{response: FolderInterface, msg: string}>(`${this.url}/api/folders`)
    .pipe(
      mapRx((response: {response: FolderInterface, msg: string}) => response.response)
    ) as Observable<FolderInterface>;
  };

  deleteFolder(folderId: string): Observable<FolderInterface> {
    return this.http.delete<{response: FolderInterface, msg: string}>(`${this.url}/api/folders/${folderId}`)
    .pipe(
      mapRx((response: {response: FolderInterface, msg: string}) => response.response)
    ) as Observable<FolderInterface>;
  };


  

}
