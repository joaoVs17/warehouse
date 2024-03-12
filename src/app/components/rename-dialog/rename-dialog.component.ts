import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogActions, MatDialogClose, MatDialogContent, MatDialogRef, MatDialogTitle } from '@angular/material/dialog';
import { FolderService } from '../../services/folder/folder.service';
import { Subscription } from 'rxjs';
import { FormControl, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { HttpClientModule } from '@angular/common/http';
import { MatButtonModule } from '@angular/material/button';
import { FileService } from '../../services/file/file.service';

@Component({
  selector: 'app-rename-dialog',
  standalone: true,
  imports: [MatDialogTitle, MatDialogContent, MatDialogActions, MatDialogClose, MatButtonModule, HttpClientModule, MatInputModule, ReactiveFormsModule],
  templateUrl: './rename-dialog.component.html',
  styleUrl: './rename-dialog.component.scss'
})
export class RenameDialogComponent {

  constructor (private ref: MatDialogRef<RenameDialogComponent>, private folder: FolderService, @Inject(MAT_DIALOG_DATA) private data: { id: string, type: string }, private file: FileService) {

  }

  archiveType: string = this.data.type;

  serviceSubscription: Subscription | undefined;


  currentFolderId: string | null | undefined = localStorage.getItem('root_folder');

  nameFormControl = new FormControl(null, [Validators.required]);

  closePopUp() {
    this.ref.close();
  }

  renameFolder() {
    this.serviceSubscription = this.folder.renameFolder(this.data.id, this.nameFormControl.value || '', localStorage.getItem('user_id') || '').subscribe(
      res => {
        console.log('renamed', res);
        this.folder.updateService(true);
      },
      err => {

      }
    );
    this.closePopUp();
  }

  renameFile() {
    this.serviceSubscription = this.file.renameFile(this.data.id, localStorage.getItem('user_id') || '', this.nameFormControl.value || '').subscribe(
      res => {
        console.log('renamed', res);
        this.folder.updateService(true);
      },
      err => {
        
      }
    );
    this.closePopUp();
  }

  ngOnDestroy(): void {
      this.serviceSubscription?.unsubscribe();
  }

}
