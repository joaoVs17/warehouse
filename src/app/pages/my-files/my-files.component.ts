import { Component, OnInit } from '@angular/core';
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


@Component({
  selector: 'app-my-files',
  standalone: true,
  imports: [FileComponent, FolderComponent, CommonModule, HttpClientModule, RouterLink, RouterLinkActive, DragAndDropDirective],
  templateUrl: './my-files.component.html',
  styleUrl: './my-files.component.scss',
  providers: [FolderService, FileService]
})
export class MyFilesComponent implements OnInit {

  foldersList: FolderInterface[] = [];
  filesList: FileInterface[] = [];
  parentList: {name: string, id: string, parent_id: string}[] = [];
  currentFolderId: string | null | undefined = localStorage.getItem('root_folder');

  constructor(private folder: FolderService, private file: FileService, private route: ActivatedRoute, private router: Router) {

  }

  ngOnInit(): void {
      this.updateUI();

      this.route.params.subscribe(
        params => {
          this.currentFolderId = params['folder_id'];
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
    this.getFoldersFromFolder(this.currentFolderId || localStorage.getItem('root_folder') || '');
    this.getFilesFromFolder(this.currentFolderId || localStorage.getItem('root_folder') || '');
    this.getFolderParentList(this.currentFolderId || '');
  }


}
