import { Component, OnInit } from '@angular/core';

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
  errorMessage: string;

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
}
