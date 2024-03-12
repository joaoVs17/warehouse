import { Component, Input } from '@angular/core';
import { FileInterface } from '../../interfaces/file.interface';
import { HttpClientModule } from '@angular/common/http';
@Component({
  selector: 'app-file',
  standalone: true,
  imports: [HttpClientModule],
  templateUrl: './file.component.html',
  styleUrl: './file.component.scss',
})
export class FileComponent {

  @Input() file: FileInterface | null = null; 

}
