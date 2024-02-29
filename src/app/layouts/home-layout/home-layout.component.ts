import { Component, OnInit } from '@angular/core';
import { Router, RouterOutlet } from '@angular/router';

import { SidebarComponent } from '../../components/sidebar/sidebar.component';
import { HomeHeaderComponent } from '../../components/home-header/home-header.component';

import { HttpClientModule } from '@angular/common/http';
import { AuthService } from '../../services/auth/auth.service';

@Component({
  selector: 'app-home-layout',
  standalone: true,
  imports: [SidebarComponent, HttpClientModule, HomeHeaderComponent, RouterOutlet],
  templateUrl: './home-layout.component.html',
  styleUrl: './home-layout.component.scss',
  providers: [AuthService]
})
export class HomeLayoutComponent implements OnInit {


  constructor() {

  }

  ngOnInit(): void {

  }

}
