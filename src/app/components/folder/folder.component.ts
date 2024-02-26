import { Component } from '@angular/core';
import { FolderInterface } from '../../interfaces/folder.interface';
import { Input } from '@angular/core';
import { DatePipe } from '@angular/common';
import { RouterLink, RouterLinkActive } from '@angular/router';

@Component({
  selector: 'app-folder',
  standalone: true,
  imports: [DatePipe, RouterLink, RouterLinkActive],
  templateUrl: './folder.component.html',
  styleUrl: './folder.component.scss'
})
export class FolderComponent {

  
  @Input() folder: FolderInterface | null = null; 


}
