import { Component, OnDestroy } from '@angular/core';
import { FolderService } from '../../services/folder/folder.service';
import { HttpClientModule } from '@angular/common/http';
import { ReactiveFormsModule } from '@angular/forms';
import { Validators, FormControl, FormGroupDirective, NgForm } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { ErrorStateMatcher } from '@angular/material/core';
import {  MatDialog, MatDialogTitle,MatDialogContent, MatDialogActions, MatDialogClose, MatDialogRef,  } from '@angular/material/dialog';
import { Subscription } from 'rxjs';
import { Router } from '@angular/router';

export class MyErrorStateMatcher implements ErrorStateMatcher {
  isErrorState(control: FormControl | null, form: FormGroupDirective | NgForm | null): boolean {
    const isSubmitted = form && form.submitted;
    return !!(control && control.invalid && (control.dirty || control.touched || isSubmitted));
  }
};

@Component({
  selector: 'app-new-folder-dialog',
  standalone: true,
  imports: [MatDialogTitle, MatDialogContent, MatDialogActions, MatDialogClose, MatButtonModule, HttpClientModule, MatInputModule, ReactiveFormsModule],
  templateUrl: './new-folder-dialog.component.html',
  styleUrl: './new-folder-dialog.component.scss',
})
export class NewFolderDialogComponent implements OnDestroy {

  constructor (private ref: MatDialogRef<NewFolderDialogComponent>, private folder: FolderService) {

  }

  folderServiceSubscription: Subscription | undefined;

  currentFolderId: string | null | undefined = localStorage.getItem('root_folder');

  folderFormControl = new FormControl(null, [Validators.required]);

  closePopUp() {
    this.ref.close();
  }

  createNewFolder() {
    this.folderServiceSubscription = this.folder.createFolder(this.folderFormControl.value || 'New Folder', localStorage.getItem('current_folder') || localStorage.getItem('root_folder') || '', localStorage.getItem('user_id') || '')
    .subscribe (
      res => {
        this.folder.updateService(true);
      },
      err => {
        console.log(err);
      }
    )
    this.closePopUp();
  }

  ngOnDestroy(): void {
      this.folderServiceSubscription?.unsubscribe();
  }

}
