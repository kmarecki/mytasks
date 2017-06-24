import * as _ from 'lodash';
import {
  Component, ComponentFactoryResolver, Type
} from '@angular/core';

import { Project } from '../../services/projects/project';
import { ProjectsService } from '../../services/projects/projects.service';

import { ProjectsEditComponent } from './projects-edit.component';
import { ProjectItemComponent } from './project-item.component';
import { EntityFormComponent } from '../entity-form/entity-form.component';

@Component({
  selector: 'app-projects',
  templateUrl: '../entity-form/entity-form.component.html',
  styleUrls: ['./projects.component.css'],
  providers: [ProjectsService]
})
export class ProjectsComponent extends EntityFormComponent<Project>  {

  protected getNameProperty(): string {
    return 'projectName';
  }

  protected getÈditFormComponent(): Type<{}> {
    return ProjectsEditComponent;
  }

  protected getListItemComponent(): Type<{}> {
    return ProjectItemComponent;
  }

  protected newEntity(): Project {
    return new Project();
  }

  protected createEntityFromEditor() {
    return { projectName: this.editor.entity.projectName }
  }

  protected getId(entity: Project): number {
    return entity.projectId;
  }

  constructor(
    projectService: ProjectsService,
    componentFactoryResolver: ComponentFactoryResolver) {
    super(projectService, componentFactoryResolver);
  }


}
