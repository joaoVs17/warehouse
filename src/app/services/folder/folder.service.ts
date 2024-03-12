import { Injectable } from '@angular/core';

import { FolderInterface } from '../../interfaces/folder.interface';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable, Subject } from 'rxjs';
import {map as mapRx} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class FolderService {

  url: string = 'http://localhost:3000';


  private changed: BehaviorSubject<boolean> =  new BehaviorSubject<boolean>(false);
  public changedObservable: Observable<boolean> = this.changed.asObservable();

  constructor(private http: HttpClient) { 

  }

  updateService(value: boolean): void {
    this.changed.next(value);
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
  
  createFolder(name: string, parent: string, owner_id: string): Observable<FolderInterface> {
    return this.http.post<{response: FolderInterface, msg: string}>(`${this.url}/api/folders`, {name: name, parent: parent, owner_id: owner_id})
    .pipe(
      mapRx((response: {response: FolderInterface, msg: string}) => response.response)
    ) as Observable<FolderInterface>;
  };

  deleteFolder(folderId: string, userId: string): Observable<FolderInterface> {
    return this.http.delete<{response: FolderInterface, msg: string}>(`${this.url}/api/folders/${folderId}/user/${userId}`)
    .pipe(
      mapRx((response: {response: FolderInterface, msg: string}) => response.response)
    ) as Observable<FolderInterface>;
  };

  renameFolder(folderId: string, name: string, userId: string): Observable<FolderInterface> {
    return this.http.patch<{response: FolderInterface, msg: string}>(`${this.url}/api/folders/${folderId}/user/${userId}`, { name: name })
    .pipe(
      mapRx((response: {response: FolderInterface, msg: string}) => response.response)
    ) as Observable<FolderInterface>;
  };

  toggleStarFolder(folder_id: string, user_id: string): Observable<FolderInterface> {
    return this.http.patch<{response: FolderInterface, msg: string}>(`${this.url}/api/folders/star`, {folder_id: folder_id, user_id: user_id})
    .pipe(
      mapRx((response: {response: FolderInterface, msg: string}) => response.response)
    ) as Observable<FolderInterface>;
  };

  getStarredFolders(user_id: string): Observable<FolderInterface[]> {
    return this.http.get<{response: FolderInterface[], msg: string}>(`${this.url}/api/folders/star/user/${user_id}`)
    .pipe(
      mapRx((response: {response: FolderInterface[], msg: string}) => response.response)
    ) as Observable<FolderInterface[]>
  };
  
  moveFolderFromFolder(folder_id: string, user_id: string, new_parent_id: string, current_folder_id: string): Observable<FolderInterface> {
    return this.http.patch<{response: FolderInterface, msg: string}>(`${this.url}/api/folders/move`, {folder_id, user_id, new_parent_id, current_folder_id})
    .pipe(
      mapRx((response: {response: FolderInterface, msg: string}) => response.response)
    ) as Observable<FolderInterface>;
  }

}
