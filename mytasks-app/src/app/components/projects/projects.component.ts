import {
  Component, ComponentFactoryResolver, Type
} from '@angular/core';
import { BsModalService } from 'ngx-bootstrap/modal';

import { Project } from '../../services/projects/project';
import { ProjectsService } from '../../services/projects/projects.service';

import { ProjectsEditComponent } from './projects-edit.component';
import { ProjectItemComponent } from './project-item.component';
import { EntityFormComponent } from '../entity-form/entity-form.component';
import { ProjectListHeaderComponent } from './project-list-header.component';

@Component({
  selector: 'app-projects',
  templateUrl: '../entity-form/entity-form.component.html',
  styleUrls: ['./projects.component.css'],
  providers: [ProjectsService]
})
export class ProjectsComponent extends EntityFormComponent<Project>  {
  protected getTitle(): string {
    return 'Projects';
  }

  protected getNameProperty(): string {
    return 'projectName';
  }

  protected getEditFormComponent(): Type<{}> {
    return ProjectsEditComponent;
  }

  protected getListHeaderComponent(): Type<{}> {
    return ProjectListHeaderComponent;
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
    componentFactoryResolver: ComponentFactoryResolver,
    modalService: BsModalService) {
    super(projectService, componentFactoryResolver, modalService);
  }


}
