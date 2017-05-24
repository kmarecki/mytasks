import { Component, OnInit } from '@angular/core';

import { Project } from './project';
import { ProjectService } from './project.service';

@Component({
  selector: 'app-projects',
  templateUrl: './projects.component.html',
  styleUrls: ['./projects.component.css'],
  providers: [ ProjectService]
})
export class ProjectsComponent implements OnInit {

  projects: Project[];
  errorMessage: string;

  constructor(private projectService: ProjectService) { }

  ngOnInit() {
    this.getProjects();
  }

  getProjects() {
    this.projectService.getProjects()
      .then(projects => this.projects = projects)
      .catch(error => this.errorMessage = error)
  }
}
