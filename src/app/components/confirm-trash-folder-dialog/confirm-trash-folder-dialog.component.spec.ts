import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ConfirmTrashFolderDialogComponent } from './confirm-trash-folder-dialog.component';

describe('ConfirmTrashFolderDialogComponent', () => {
  let component: ConfirmTrashFolderDialogComponent;
  let fixture: ComponentFixture<ConfirmTrashFolderDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ConfirmTrashFolderDialogComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ConfirmTrashFolderDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
