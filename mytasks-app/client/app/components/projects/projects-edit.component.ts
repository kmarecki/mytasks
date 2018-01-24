import { Component, Input, Type } from '@angular/core';

import { EditFormComponent } from '../entity-form/edit-form.component';
import { Project } from '../../services/projects/project';

@Component({
    templateUrl: './projects-edit.component.html'
})
export class ProjectsEditComponent implements EditFormComponent<Project> {
    @Input() entity: Project
}
