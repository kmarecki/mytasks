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
import { EntityFormComponent } from './entity-form.component';

@Component({
  selector: 'app-projects',
  templateUrl: './entity-form.component.html',
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
