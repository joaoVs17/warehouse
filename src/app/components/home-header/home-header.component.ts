import { Component } from '@angular/core';
import { SearchInputComponent } from '../search-input/search-input.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faSliders } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-home-header',
  standalone: true,
  imports: [SearchInputComponent, FontAwesomeModule],
  templateUrl: './home-header.component.html',
  styleUrl: './home-header.component.scss'
})
export class HomeHeaderComponent {

  faSliders = faSliders

  first_name: string | null = localStorage.getItem('first_name')

}
