import { Component, OnInit } from '@angular/core';
import { FileComponent } from '../../components/file/file.component';
import { FolderComponent } from '../../components/folder/folder.component';
import { FolderService } from '../../services/folder/folder.service';
import { FileService } from '../../services/file/file.service';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { FileInterface } from '../../interfaces/file.interface';
import { FolderInterface } from '../../interfaces/folder.interface';

import { ActivatedRoute, Router } from '@angular/router';


@Component({
  selector: 'app-my-files',
  standalone: true,
  imports: [FileComponent, FolderComponent, CommonModule, HttpClientModule],
  templateUrl: './my-files.component.html',
  styleUrl: './my-files.component.scss',
  providers: [FolderService, FileService]
})
export class MyFilesComponent implements OnInit {

  foldersList: FolderInterface[] = [];
  filesList: FileInterface[] = [];

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

  updateUI() {
    this.getFoldersFromFolder(this.currentFolderId || localStorage.getItem('root_folder') || '');
    this.getFilesFromFolder(this.currentFolderId || localStorage.getItem('root_folder') || '');
  }


}
