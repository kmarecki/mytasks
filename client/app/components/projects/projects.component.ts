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

  ngOnInit() {
    this.getProjects();
  }

  getProjects() {
    this.projectService.getProjects()
      .subscribe(
      projects => this.projects = projects,
      error => this.errorMessage = error);
  }

  create() {
    this.selectedProject = new Project();
    this.onFocus.emit(true);
  }

  edit(project: Project) {
    this.selectedProject = project;
    this.onFocus.emit(true);
  }

  save() {
    const promise = this.selectedProject.projectId ?
      this.projectService.update(this.selectedProject) :
      this.projectService.create(this.selectedProject.projectName);

    promise
      .then(() => {
        this.getProjects();
        this.selectedProject = undefined;
      });
  }

  cancel() {
    this.selectedProject = undefined;
  }
}
