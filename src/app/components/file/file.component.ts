import { Component, Input } from '@angular/core';
import { FileInterface } from '../../interfaces/file.interface';

@Component({
  selector: 'app-file',
  standalone: true,
  imports: [],
  templateUrl: './file.component.html',
  styleUrl: './file.component.scss'
})
export class FileComponent {

  @Input() file: FileInterface | null = null; 

}
