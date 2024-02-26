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

  createFile(file: FileInterface): Observable<FileInterface> {
    return this.http.post<{response: FileInterface, msg: string}>(`${this.url}/api/files`, file)
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

}
