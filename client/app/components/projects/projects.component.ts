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

  new() {
    this.selectedProject = new Project();
    this.onFocus.emit(true);
  }

  edit(project: Project) {
    this.selectedProject = project;
    this.onFocus.emit(true);
  }

  save(project: Project) {
    this.selectedProject = undefined;
  }

  cancel() {
    this.selectedProject = undefined;
  }
}
