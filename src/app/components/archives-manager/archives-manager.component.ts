import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { ActivatedRoute, Router, RouterLink, RouterLinkActive } from '@angular/router';
import { DragAndDropDirective } from '../../directives/dnd/drag-and-drop.directive';
import { MatButtonModule } from '@angular/material/button';
import { MatMenuModule } from '@angular/material/menu';
import { MatDialog } from '@angular/material/dialog';

import { RenameDialogComponent } from '../rename-dialog/rename-dialog.component';
import { Input } from '@angular/core';
import { saveAs } from 'file-saver';
//services
import { FileService } from '../../services/file/file.service';
import { FolderService } from '../../services/folder/folder.service';
//interfaces
import { FolderInterface } from '../../interfaces/folder.interface';
import { FileInterface } from '../../interfaces/file.interface';
//components
import { FileComponent } from '../file/file.component';
import { FolderComponent } from '../folder/folder.component';
import { ConfirmTrashFolderDialogComponent } from '../confirm-trash-folder-dialog/confirm-trash-folder-dialog.component';
//For Data Binding
import { Output, EventEmitter } from '@angular/core';
//For image optimization
import { NgxImageCompressService } from 'ngx-image-compress'  ;
import { Exifr } from 'exifr';

//for drag and drop
import {
  CdkDragDrop,
  CdkDrag,
  CdkDropList,
  CdkDropListGroup,
  moveItemInArray,
  transferArrayItem,
} from '@angular/cdk/drag-drop';
//drag and drop from primeng
import { DragDropModule } from 'primeng/dragdrop';


@Component({
  selector: 'app-archives-manager',
  standalone: true,
  imports: [FileComponent, FolderComponent, ConfirmTrashFolderDialogComponent, CommonModule, HttpClientModule, RouterLink, RouterLinkActive, DragAndDropDirective, MatButtonModule, MatMenuModule, DragDropModule],
  templateUrl: './archives-manager.component.html',
  styleUrl: './archives-manager.component.scss'
})
export class ArchivesManagerComponent {

  @Input() page: string = '';
  @Output() draggedData = new EventEmitter<FileInterface | FolderInterface | null>(); 


  foldersList: FolderInterface[] = [];
  filesList: FileInterface[] = [];
  parentList: {name: string, id: string, parent_id: string}[] = [];
  currentFolderId: string = localStorage.getItem('root_folder') || '';

  changed: boolean = false;

  selectedFolderIdMenu: string = '';
  selectedFile: FileInterface | undefined;

  draggedFile: FileInterface | null = null;
  draggedFolder: FolderInterface | null = null;

  constructor(private folder: FolderService, private file: FileService, private route: ActivatedRoute, private dialog: MatDialog, private router: Router, private imageCompress: NgxImageCompressService) {

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
    },
    err => {
      console.log(err);
    }
  )
}

getStarredFolders() {
  this.folder.getStarredFolders(localStorage.getItem('user_id') || '').subscribe(
    res => {
      this.foldersList = res;
    },
    err => {
      console.log(err);
    }
  )
}

getStarredFiles() {
  this.file.getStarredFiles(localStorage.getItem('user_id') || '').subscribe(
    res => {
      this.filesList = res;
    },
    err => {
      console.log(err);
    }
  )
}

onFileDragStart(file: FileInterface) {
  this.draggedFile = file;
  this.draggedData.emit(file);
}
onFileDragEnd() {
  this.draggedFile = null;
  this.draggedData.emit(null);
}

onFolderDragStart(folder: FolderInterface) {
  this.draggedFolder = folder;
  this.draggedData.emit(folder);
}
onFolderDragEnd() {
  this.draggedFolder = null;
  this.draggedData.emit(null);
}

onArchiveDroppedOnFolderPrimeng(folder_id: string) {
  
  if (this.draggedFolder && this.draggedFolder._id != folder_id) {
    this.folder.moveFolderFromFolder(this.draggedFolder?._id || '', localStorage.getItem('user_id') || '', folder_id, this.draggedFolder?.metadata.parent || '').subscribe (
      res => {
        this.updateUI();
      },
      err => {
        console.log(err);
      }
    )
  }

  if (this.draggedFile) {
    this.file.moveFileFromFolder(this.draggedFile._id || '', localStorage.getItem('user_id') || '', folder_id, this.draggedFile.metadata.parent || '').subscribe(
      res => {
        this.updateUI();
      },
      err => { 
        console.log(err);
      }
    )
  }
}

onFileDropped($event : any) {
  console.log($event);
  for (const item of $event) {
    const formData = new FormData();
/*     this.imageCompress.compressFile(item, exi, 50, 50).then(compressedImage => {
      console.log(compressedImage);
    }) */
    formData.append('file', item);
    formData.append('folder_id', localStorage.getItem('current_folder') || '');
    formData.append('owner_id', localStorage.getItem('user_id') || 'kk');
    this.file.createFile(formData).subscribe(
      res => {
        this.updateUI();
      },
      err => {
        console.log(err);
      }
    );
  }
}
onFileDroppedOnFolder($event: any, folder_id: string) {
  if (!folder_id) {return;}
  for (const item of $event) {
    const formData = new FormData();
    formData.append('file', item);
    formData.append('folder_id',  folder_id);
    formData.append('owner_id', localStorage.getItem('user_id') || '');
    this.file.createFile(formData).subscribe(
      res => {
        this.updateUI();
      },
      err => {
        console.log(err);
      }
    );
  }
}

updateUI() {
  localStorage.setItem('current_folder', this.currentFolderId || localStorage.getItem('current_folder') || '');
  if (this.page == 'starred') {
    this.getStarredFiles();
    this.getStarredFolders();
  } else {
    this.getFoldersFromFolder(this.currentFolderId || localStorage.getItem('root_folder') || '');
    this.getFilesFromFolder(this.currentFolderId || localStorage.getItem('root_folder') || '');
  }

}


ngOnDestroy(): void {
    localStorage.removeItem('current_folder');
}

starFolder(folderId: string) {
  this.folder.toggleStarFolder(folderId, localStorage.getItem('user_id') || '').subscribe(
    () => {
      this.folder.updateService(true);
    },
    err => {
      console.log(err)
    }
  )
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
  this.file.toggleStarFile(fileId, localStorage.getItem('user_id') || '').subscribe(
    res => {
      this.folder.updateService(true);
    }
  )
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
