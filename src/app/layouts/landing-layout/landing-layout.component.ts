import { Component } from '@angular/core';
import { Router, RouterOutlet } from '@angular/router';

import { HeaderComponent } from '../../components/header/header.component';

@Component({
  selector: 'app-landing-layout',
  standalone: true,
  imports: [HeaderComponent, RouterOutlet],
  templateUrl: './landing-layout.component.html',
  styleUrl: './landing-layout.component.css'
})
export class LandingLayoutComponent {

}
