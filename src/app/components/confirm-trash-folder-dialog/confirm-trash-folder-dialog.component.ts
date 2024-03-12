import { Component, Inject, OnDestroy } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MAT_DIALOG_DATA, MatDialogActions, MatDialogClose, MatDialogContent, MatDialogRef, MatDialogTitle } from '@angular/material/dialog';
import { FolderService } from '../../services/folder/folder.service';
import { HttpClientModule } from '@angular/common/http';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-confirm-trash-folder-dialog',
  standalone: true,
  imports: [MatButtonModule, MatDialogTitle, MatDialogContent, MatDialogActions, MatDialogClose, HttpClientModule],
  templateUrl: './confirm-trash-folder-dialog.component.html',
  styleUrl: './confirm-trash-folder-dialog.component.scss'
})
export class ConfirmTrashFolderDialogComponent implements OnDestroy {

  constructor(@Inject(MAT_DIALOG_DATA) private data: {folderId: string}, private folder: FolderService, private ref: MatDialogRef<ConfirmTrashFolderDialogComponent>) {

  }

  folderServiceSubscription: Subscription | undefined;

  closePopUp() {
    this.ref.close();
  }

  deleteFolder() {
    this.folderServiceSubscription = this.folder.deleteFolder(this.data.folderId, localStorage.getItem('user_id') || '').subscribe(
      res => {
        this.folder.updateService(true);
      },
      err => {
        console.log(err);
      }
    );
    this.closePopUp(); 
  }

  ngOnDestroy(): void {
      this.folderServiceSubscription?.unsubscribe();
  }



}
