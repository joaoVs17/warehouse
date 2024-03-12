import { Component, OnDestroy, OnInit } from '@angular/core';
import { FolderService } from '../../services/folder/folder.service';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
;
import { RouterLinkActive, RouterLink } from '@angular/router';
import { ActivatedRoute, Router } from '@angular/router';
import { ArchivesManagerComponent } from '../../components/archives-manager/archives-manager.component';

import { DragDropModule } from 'primeng/dragdrop';
import { FileInterface } from '../../interfaces/file.interface';
import { FolderInterface } from '../../interfaces/folder.interface';
import { FileService } from '../../services/file/file.service';

@Component({
  selector: 'app-my-files',
  standalone: true,
  imports: [RouterLink, RouterLinkActive, CommonModule, HttpClientModule, ArchivesManagerComponent, DragDropModule],
  templateUrl: './my-files.component.html',
  styleUrl: './my-files.component.scss',
  providers: []
})
export class MyFilesComponent implements OnInit, OnDestroy {

  parentList: {name: string, id: string, parent_id: string}[] = [];
  currentFolderId: string | null | undefined = localStorage.getItem('root_folder');
  draggedData: FileInterface | FolderInterface | null = null;


  constructor(private folder: FolderService, private file: FileService, private route: ActivatedRoute, private router: Router) {

  }

  getDraggedArchiveData(archive: FileInterface | FolderInterface | null) {
    this.draggedData = archive;
  }

  onDropArchiveOnFolder(parent_id: string) {
    if (this.draggedData) {
      if ('key' in this.draggedData && this.draggedData.metadata.parent != parent_id) {
        this.file.moveFileFromFolder(this.draggedData._id || '', localStorage.getItem('user_id') || '', parent_id, this.draggedData.metadata.parent || '').subscribe(
          res => {
            this.folder.updateService(true);
          },
          err => { 
            console.log(err);
          }
        )
      } else if (this.draggedData._id != parent_id && this.draggedData.metadata.parent != parent_id) {
        this.folder.moveFolderFromFolder(this.draggedData._id || '', localStorage.getItem('user_id') || '', parent_id, this.draggedData.metadata.parent || '').subscribe (
          res => {
            this.folder.updateService(true);
          },
          err => {
            console.log(err);
          }
        )
      }
    }
  }

  ngOnInit(): void {
      this.updateUI();

      this.route.params.subscribe(
        params => {
          if (params['folder_id']) this.currentFolderId = params['folder_id'];
          this.updateUI();
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


  updateUI() {
    localStorage.setItem('current_folder', this.currentFolderId || '');
    this.getFolderParentList(this.currentFolderId || '');
  }


  ngOnDestroy(): void {
      localStorage.removeItem('current_folder');
  }
}
