import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink, RouterLinkActive } from '@angular/router';

import { filter } from 'rxjs/operators'
import { NgTemplateOutlet } from '@angular/common';
import { NavigationEnd } from '@angular/router';
import { Router } from '@angular/router';


@Component({
  selector: 'app-header',
  standalone: true,
  imports: [CommonModule, NgTemplateOutlet, RouterLink, RouterLinkActive],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss',
})
export class HeaderComponent implements OnInit{

  currentRoute : string = '';

  constructor(private router: Router) {
    
  }

  ngOnInit(): void {    

    this.updateUI();
    
    this.router.events.pipe(
      filter((event) => event instanceof NavigationEnd)
    ).subscribe(() => {
      this.updateUI();
    });


  }

  updateUI() {
    this.currentRoute = this.router.url;
  }

}
