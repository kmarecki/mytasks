import { ListColumnModel } from './../entity-form/list-header/list.header.model';
import {
  Component, ComponentFactoryResolver, Type
} from '@angular/core';
import { BsModalService } from 'ngx-bootstrap/modal';

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
export class ProjectsComponent extends EntityFormComponent<Project, ProjectsService>  {
  protected getTitle(): string {
    return 'Projects';
  }

  protected getColumns(): ListColumnModel[] {
    return [new ListColumnModel("projectName", "Name", 12)]
  }

  protected getEditFormComponent(): Type<{}> {
    return ProjectsEditComponent;
  }

  protected getListItemComponent(): Type<{}> {
    return ProjectItemComponent;
  }

  protected newEntity(): Project {
    return new Project();
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
