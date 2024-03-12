import { Injectable } from '@angular/core';

import { FileInterface } from '../../interfaces/file.interface';
import { FolderInterface } from '../../interfaces/folder.interface';
import { UserInterface } from '../../interfaces/user.interface';

import { HttpClient } from '@angular/common/http';
import { map as mapRx, Observable} from 'rxjs'

@Injectable({
  providedIn: 'root'
})
export class FileService {

  url: string = 'http://localhost:3000'

  constructor(private http: HttpClient) { 

  }

  getFiles(): Observable<FileInterface[]> {
    return this.http.get<{response: FileInterface[], msg: string}>(`${this.url}/api/files`)
    .pipe(
      mapRx((response: {response: FileInterface[], msg: string}) => response.response)
    ) as Observable<FileInterface[]>
  };

  getFilesFromFolder(user_id: string, parent_id: string): Observable<FileInterface[]> {
    return this.http.get<{response: FileInterface[], msg: string}>(`${this.url}/api/files/user/${user_id}/parent/${parent_id}`)
    .pipe(
      mapRx((response: {response: FileInterface[], msg: string}) => response.response)
    ) as Observable<FileInterface[]>;
  };

  createFile(formData: FormData): Observable<FileInterface> {
    return this.http.post<{response: FileInterface, msg: string}>(`${this.url}/api/files`, formData)
    .pipe(
      mapRx((response: {response: FileInterface, msg: string}) => response.response)
    ) as Observable<FileInterface>
  };

  deleteFile(fileId: string): Observable<FileInterface> {
    return this.http.delete<{response: FileInterface, msg: string}>(`${this.url}/api/files/${fileId}`)
    .pipe(
      mapRx((response: {response: FileInterface, msg: string}) => response.response)
    ) as Observable<FileInterface>
  };

  downloadFile(fileId: string): Observable<Blob> {
    console.log('service');
    return this.http.get(`${this.url}/api/files/${fileId}`, {responseType: 'blob'});
  }

  renameFile(fileId: string, user_id: string, name: string): Observable<FileInterface> {
    return this.http.patch<{response: FileInterface, msg: string}>(`${this.url}/api/files/${fileId}/user/${user_id}`, {name: name})
    .pipe(
      mapRx((response: {response: FileInterface, msg: string}) => response.response)
    ) as Observable<FileInterface>;
  }
  
  toggleStarFile(fileId: string, user_id: string): Observable<FileInterface> {
    return this.http.patch<{response: FileInterface, msg: string}>(`${this.url}/api/files/star/`, {file_id: fileId, user_id: user_id})
    .pipe(
      mapRx((response: {response: FileInterface, msg: string}) => response.response)
   ) as Observable<FileInterface>;
  };

  getStarredFiles(user_id: string): Observable<FileInterface[]> {
    return this.http.get<{response: FileInterface[], msg: string}>(`${this.url}/api/files/star/user/${user_id}`)
    .pipe(
      mapRx((response: {response: FileInterface[], msg: string}) => response.response)
    ) as Observable<FileInterface[]>
  };

  moveFileFromFolder(file_id: string, user_id: string, new_parent_id: string, current_folder_id: string): Observable<FileInterface> {
    return this.http.patch<{response: FileInterface, msg: string}>(`${this.url}/api/files/move`, {file_id, user_id, new_parent_id, current_folder_id})
    .pipe(
      mapRx((response: {response: FileInterface, msg: string}) => response.response)
    ) as Observable<FileInterface>;
  }

}
