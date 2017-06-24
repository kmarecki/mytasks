import * as _ from 'lodash';
import {
  Component, ComponentFactoryResolver, OnInit, AfterViewInit, EventEmitter,
  QueryList, ViewChild, ViewChildren, Type, ViewContainerRef, AfterContentInit, AfterViewChecked
} from '@angular/core';

import { Project } from '../../services/projects/project';
import { ProjectsService } from '../../services/projects/projects.service';

import { EditFormDirective } from './edit-form.directive';
import { ListItemDirective } from './list-item.directive';

import { ProjectsEditComponent } from './projects-edit.component';
import { ProjectItemComponent } from './project-item.component';
import { EntityFormComponentImpl, EntityFormComponent } from './entity-form.component';

@Component({
  selector: 'app-projects',
  templateUrl: './entity-form.component.html',
  styleUrls: ['./projects.component.css'],
  providers: [ProjectsService]
})
export class ProjectsComponent extends EntityFormComponent<Project> implements EntityFormComponentImpl<Project> {

  getÈditFormComponent(): Type<{}> {
    return ProjectsEditComponent;
  }

  getListItemComponent(): Type<{}> {
    return ProjectItemComponent;
  }

  newEntity(): Project {
    return new Project();
  }

  createEntityFromEditor() {
    return { projectName: this.editor.entity.projectName }
  }

  getId(entity: Project): number {
    return entity.projectId;
  }

  constructor(
    projectService: ProjectsService,
    componentFactoryResolver: ComponentFactoryResolver) {
    super(projectService, componentFactoryResolver);
  }


}
