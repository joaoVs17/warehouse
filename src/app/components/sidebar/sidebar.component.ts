import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { RouterLinkActive } from '@angular/router';
import { MatButton } from '@angular/material/button';
import {MatIconModule} from '@angular/material/icon';
import { ButtonModule } from 'primeng/button';
import { CollapseDirective } from '../../directives/collapse/collapse.directive';
import { NgClass } from '@angular/common';

@Component({
  selector: 'app-sidebar',
  standalone: true,
  imports: [ButtonModule, RouterLink, RouterLinkActive, MatIconModule, MatButton, CollapseDirective, NgClass],
  templateUrl: './sidebar.component.html',
  styleUrl: './sidebar.component.scss'
})
export class SidebarComponent {

  collapsed: boolean = false;

  toggleCollapse() {
    this.collapsed = !this.collapsed;
  }

}
