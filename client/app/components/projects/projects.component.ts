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

@Component({
  selector: 'app-projects',
  templateUrl: './projects.component.html',
  styleUrls: ['./projects.component.css'],
  providers: [ProjectsService]
})

export class ProjectsComponent implements OnInit, AfterViewInit, AfterContentInit, AfterViewChecked {
  ngAfterViewChecked(): void {
    
  }

  ngAfterContentInit(): void {

  }

  projects: Project[];
  errorMessage: string;
  editor: ProjectsEditComponent = { project: undefined };

  onFocus = new EventEmitter<boolean>();

  @ViewChild(EditFormDirective) editForm: EditFormDirective;
  @ViewChildren(ListItemDirective) listItem: QueryList<ListItemDirective>;


  constructor(
    private projectService: ProjectsService,
    private componentFactoryResolver: ComponentFactoryResolver) { }

  ngAfterViewInit(): void {
    let componentFactory = this.componentFactoryResolver.resolveComponentFactory(ProjectsEditComponent);
    let viewContainerRef = this.editForm.viewContainerRef;
    this.editor = <ProjectsEditComponent>viewContainerRef.createComponent(componentFactory).instance;

    this.listItem.changes
      .subscribe(() =>
        setTimeout(() => {
          this.refresh();
        }));
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
      this.projectService.update(this.editor.project.projectId, this.editor.project) :
      this.projectService.create(this.editor.project.projectName);

    promise
      .then(() => {
        this.getProjects();
        this.editor.project = undefined;
      });
  }

  cancel(): void {
    this.editor.project = undefined;
  }

  refresh(): void {

    let itemComponentFactory = this.componentFactoryResolver.resolveComponentFactory(ProjectItemComponent)
    let itemRefs = this.listItem.toArray();
    for (let i = 0; i < itemRefs.length; i++) {
      let itemRef = itemRefs[i].viewContainerRef;
      itemRef.clear();
      let itemComponent = itemRef.createComponent(itemComponentFactory);
      itemComponent.changeDetectorRef.detectChanges();
      itemComponent.instance.project = <Project>itemRefs[i].item;
    }

  }
}
