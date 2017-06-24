import { Component, Input } from '@angular/core';

import { Project } from '../../services/projects/project';
import { ListItemComponent } from './list-item.component';

@Component({
  selector: 'app-project-item',
  templateUrl: './project-item.component.html',
  styleUrls: ['./project-item.component.css']
})
export class ProjectItemComponent implements ListItemComponent<Project>  {
  @Input() item: object | Project;
}
