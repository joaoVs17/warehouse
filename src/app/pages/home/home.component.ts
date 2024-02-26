import { Component } from '@angular/core';
import { FilesListComponent } from '../../components/files-list/files-list.component';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [FilesListComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent {

}
