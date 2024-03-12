import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ArchivesManagerComponent } from './archives-manager.component';

describe('ArchivesManagerComponent', () => {
  let component: ArchivesManagerComponent;
  let fixture: ComponentFixture<ArchivesManagerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ArchivesManagerComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ArchivesManagerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
