import { Component, OnInit } from '@angular/core';
import { Router, RouterOutlet } from '@angular/router';

import { HeaderComponent } from '../../components/header/header.component';
import { HttpClientModule } from '@angular/common/http';
import { AuthService } from '../../services/auth/auth.service';

@Component({
  selector: 'app-landing-layout',
  standalone: true,
  imports: [HeaderComponent, RouterOutlet, HttpClientModule],
  templateUrl: './landing-layout.component.html',
  styleUrl: './landing-layout.component.scss',
  providers: [AuthService],
})
export class LandingLayoutComponent implements OnInit {


  constructor() {

  }

  ngOnInit(): void {

  }


}
