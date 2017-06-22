import * as _ from 'lodash';
import { Component, OnInit, EventEmitter } from '@angular/core';

import { Project } from '../../services/projects/project';
import { ProjectsService } from '../../services/projects/projects.service';

@Component({
  selector: 'app-projects',
  templateUrl: './projects.component.html',
  styleUrls: ['./projects.component.css'],
  providers: [ProjectsService]
})

export class ProjectsComponent implements OnInit {

  projects: Project[];
  selectedProject: Project;
  errorMessage: string;

  onFocus = new EventEmitter<boolean>();

  constructor(private projectService: ProjectsService) { }

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
    this.selectedProject = new Project();
    this.onFocus.emit(true);
  }

  edit(project: Project): void {
    this.selectedProject = _.clone(project);
    this.onFocus.emit(true);
  }

  delete(project: Project): void {
    this.projectService.delete(project.projectId)
      .then(() => {
        this.getProjects();
        if(this.selectedProject.projectId == project.projectId) {
          this.selectedProject = undefined;
        }});
  }

  save(): void {
    const promise = this.selectedProject.projectId ?
      this.projectService.update(this.selectedProject.projectId, this.selectedProject) :
      this.projectService.create(this.selectedProject.projectName);

    promise
      .then(() => {
        this.getProjects();
        this.selectedProject = undefined;
      });
  }

  cancel(): void {
    this.selectedProject = undefined;
  }
}
