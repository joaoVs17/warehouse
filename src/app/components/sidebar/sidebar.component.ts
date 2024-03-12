import { Component, TemplateRef } from '@angular/core';
import { RouterLink } from '@angular/router';
import { RouterLinkActive } from '@angular/router';
import {MatMenuModule} from '@angular/material/menu';
import {MatButtonModule} from '@angular/material/button';
import {MatIconModule} from '@angular/material/icon';
import { NgClass } from '@angular/common';
import { ClickOutsideDirective } from '../../directives/clickOutside/click-outside.directive';
import { CommonModule } from '@angular/common';
import { ModalService } from '../../services/modal/modal.service';
import { MatDialog } from '@angular/material/dialog';
import { NewFolderDialogComponent } from '../new-folder-dialog/new-folder-dialog.component';


@Component({
  selector: 'app-sidebar',
  standalone: true,
  imports: [RouterLink, RouterLinkActive, CommonModule, MatIconModule, MatButtonModule, MatMenuModule, NgClass, ClickOutsideDirective],
  templateUrl: './sidebar.component.html',
  styleUrl: './sidebar.component.scss'
})
export class SidebarComponent {

  collapsed: boolean = false;
  menuToggled: boolean = false;
  isModalOpen: boolean = false;

  constructor(private modal: ModalService, private dialog: MatDialog) {

  }

  toggleCollapse() {
    this.collapsed = !this.collapsed;
  }

  toggleMenu() {
    this.menuToggled = !this.menuToggled;
  }

  toggleMenuOff() {
    this.menuToggled = false;
  }

  openModal() {
    this.dialog.open(NewFolderDialogComponent, {
      width: '428px',
      height: '256px'
    });
    this.toggleMenuOff();
  }

}
