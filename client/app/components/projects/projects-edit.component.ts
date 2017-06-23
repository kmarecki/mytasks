import { Component, Input, Type } from '@angular/core';

import { Project } from '../../services/projects/project';

export interface EditComponent {
}

@Component({
    templateUrl: './projects-edit.component.html'
})
export class ProjectsEditComponent implements EditComponent {
    @Input() project: Project;
}