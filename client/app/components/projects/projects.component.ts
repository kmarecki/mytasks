import * as _ from 'lodash';
import { Component, ComponentFactoryResolver, OnInit, AfterViewInit, EventEmitter, ViewChild, Type } from '@angular/core';

import { Project } from '../../services/projects/project';
import { ProjectsService } from '../../services/projects/projects.service';

import { EditFormDirective } from './edit-form.directive';
import { EditComponent, ProjectsEditComponent } from "./projects-edit.component";

@Component({
  selector: 'app-projects',
  templateUrl: './projects.component.html',
  styleUrls: ['./projects.component.css'],
  providers: [ProjectsService]
})

export class ProjectsComponent implements OnInit, AfterViewInit {

  projects: Project[];
  errorMessage: string;
  editor: ProjectsEditComponent = { project: undefined };

  onFocus = new EventEmitter<boolean>();

  @ViewChild(EditFormDirective) editForm: EditFormDirective;

  constructor(
    private projectService: ProjectsService,
    private componentFactoryResolver: ComponentFactoryResolver) { }

  ngAfterViewInit(): void {
    let componentFactory = this.componentFactoryResolver.resolveComponentFactory(ProjectsEditComponent);
    let viewContainerRef = this.editForm.viewContainerRef;
    this.editor = <ProjectsEditComponent> viewContainerRef.createComponent(componentFactory).instance;
  }
  ngOnInit(): void {
    this.getProjects();
  }

  getProjects(): void {
    this.projectService.getProjects()
      .subscribe(
      projects => this.projects = projects,
      error => this.errorMessage = error);
  }

  create(): void {
    this.editor.project = new Project();
    this.onFocus.emit(true);
  }

  edit(project: Project): void {
    this.editor.project = _.clone(project);
    this.onFocus.emit(true);
  }

  delete(project: Project): void {
    this.projectService.delete(project.projectId)
      .then(() => {
        this.getProjects();
        if (this.editor.project.projectId == project.projectId) {
          this.editor.project = undefined;
        }
      });
  }

  save(): void {
    const promise = this.editor.project.projectId ?
      this.projectService.update( this.editor.project.projectId,  this.editor.project) :
      this.projectService.create( this.editor.project.projectName);

    promise
      .then(() => {
        this.getProjects();
        this.editor.project = undefined;
      });
  }

  cancel(): void {
    this.editor.project = undefined;
  }
}
