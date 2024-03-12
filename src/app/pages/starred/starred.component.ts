import { Component } from '@angular/core';
import { ArchivesManagerComponent } from '../../components/archives-manager/archives-manager.component';

@Component({
  selector: 'app-starred',
  standalone: true,
  imports: [ArchivesManagerComponent],
  templateUrl: './starred.component.html',
  styleUrl: './starred.component.scss'
})
export class StarredComponent {

}
