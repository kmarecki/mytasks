import { Component, Input } from '@angular/core';

import { Project } from '../../services/projects/project';

@Component({
  selector: 'app-project-item',
  templateUrl: './project-item.component.html',
  styleUrls: ['./project-item.component.css']
})
export class ProjectItemComponent  {

  @Input() project: Project;

}
