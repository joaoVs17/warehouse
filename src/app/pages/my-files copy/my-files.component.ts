import { Component, OnDestroy, OnInit } from '@angular/core';
import { FileComponent } from '../../components/file/file.component';
import { FolderComponent } from '../../components/folder/folder.component';
import { FolderService } from '../../services/folder/folder.service';
import { FileService } from '../../services/file/file.service';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { FileInterface } from '../../interfaces/file.interface';
import { FolderInterface } from '../../interfaces/folder.interface';
import { RouterLinkActive, RouterLink } from '@angular/router';
import { ActivatedRoute, Router } from '@angular/router';
import { DragAndDropDirective } from '../../directives/dnd/drag-and-drop.directive';

import {MatMenuModule} from '@angular/material/menu';
import {MatButtonModule} from '@angular/material/button';
import { MatDialog } from '@angular/material/dialog';
import { ConfirmTrashFolderDialogComponent } from '../../components/confirm-trash-folder-dialog/confirm-trash-folder-dialog.component';
import { RenameDialogComponent } from '../../components/rename-dialog/rename-dialog.component';

import { saveAs } from 'file-saver';

@Component({
  selector: 'app-my-files',
  standalone: true,
  imports: [FileComponent, FolderComponent, CommonModule, HttpClientModule, RouterLink, RouterLinkActive, DragAndDropDirective, MatButtonModule, MatMenuModule],
  templateUrl: './my-files.component.html',
  styleUrl: './my-files.component.scss',
  providers: []
})
export class MyFilesComponent implements OnInit, OnDestroy {

  title: string = '';

  foldersList: FolderInterface[] = [];
  filesList: FileInterface[] = [];
  parentList: {name: string, id: string, parent_id: string}[] = [];
  currentFolderId: string | null | undefined = localStorage.getItem('root_folder');

  changed: boolean = false;

  selectedFolderIdMenu: string = '';
  selectedFile: FileInterface | undefined;


  constructor(private folder: FolderService, private file: FileService, private route: ActivatedRoute, private dialog: MatDialog, private router: Router) {
    if (this.router.url.includes('my_files')) {
      this.title = 'My Files';
    } else if (this.router.url.includes('starred')) {
      this.title = 'Starred';
    }
  }

  ngOnInit(): void {
      this.updateUI();

      this.route.params.subscribe(
        params => {
          this.currentFolderId = params['folder_id'];
          this.updateUI();
        }
      )

      this.folder.changedObservable.subscribe(
        res => {
          console.log('Subscribe',res);
          this.updateUI();
        }
      )

    }
  getFoldersFromFolder(parent_id: string) {
    this.folder.getFoldersFromFolder(localStorage.getItem('user_id') || '', parent_id).subscribe(
      res => {
        this.foldersList = res;
      }
    )
  }

  getFilesFromFolder(parent_id: string) {
    this.file.getFilesFromFolder(localStorage.getItem('user_id') || '', parent_id).subscribe(
      res => {
        this.filesList = res;
        console.log(res);
      }
    )
  }

  getFolderParentList(folder_id: string) {
    this.folder.getFolderParentList(folder_id).subscribe(
      res => {
        this.parentList = res;
      }
    )
  }

  fileDropHandler (event: any){

  }

  nothing() {

  }

  onFileDropped($event : any) {
    console.log($event);
    for (const item of $event) {
      const formData = new FormData();
      formData.append('file', item);
      formData.append('folder_id', this.currentFolderId || '');
      formData.append('owner_id', localStorage.getItem('user_id') || '');
      this.file.createFile(formData).subscribe(
        res => {
          console.log(res);
          this.updateUI();
        },
        err => {
          console.log(err);
        }
      );
    }

  }


  updateUI() {
    localStorage.setItem('current_folder', this.currentFolderId || '');
    this.getFoldersFromFolder(this.currentFolderId || localStorage.getItem('root_folder') || '');
    this.getFilesFromFolder(this.currentFolderId || localStorage.getItem('root_folder') || '');
    this.getFolderParentList(this.currentFolderId || '');
  }


  ngOnDestroy(): void {
      localStorage.removeItem('current_folder');
  }

  starFolder(folderId: string) {
    console.log('star', folderId);
  }

  trashFolder(folderId: string) {
    this.dialog.open(ConfirmTrashFolderDialogComponent, {
      width: '428px',
      height: '196px',
      data: {folderId: folderId}
    })
  }

  renameFolder(id: string) {
    this.dialog.open(RenameDialogComponent, {
      width: '428px',
      height: '256px',
      data: { id: id, type: 'folder' }
    })
  }

  starFile(fileId: string) {

  }

  renameFile(id: string) {
    this.dialog.open(RenameDialogComponent, {
      width: '428px',
      height: '256px',
      data: {id: id, type: 'file'}
    })
  }

  trashFile(fileId: string) {

  }

  downloadFile(file_id: string) {
    this.file.downloadFile(file_id).subscribe(
      (res: Blob) => {
        saveAs(res, this.selectedFile?.name);
      }
    )
  }

}
