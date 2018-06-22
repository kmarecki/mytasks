import { Component, Input, Type, OnInit } from '@angular/core';

import { EditFormComponent } from '../entity-form/edit-form.component';
import { Task } from '../../services/tasks/task';
import { TaskState } from '../../services/tasks/task-state';
import { EnumHelper, EnumOption } from '../../../helpers/enum-helper';
// import { RestService } from 'app/services/rest-service';
// import { Project } from 'app/services/projects/project';
import { BsModalService } from 'ngx-bootstrap';
import { RestService } from '../../services/rest-service';
import { Project } from '../../services/projects/project';
import { ProjectsService } from '../../services/projects/projects.service';

@Component({
  templateUrl: './task-edit.component.html'
})
export class TaskEditComponent implements EditFormComponent<Task>, OnInit {
  @Input() entity: Task;

  TaskState = TaskState;
  taskstates: EnumOption[];
  projects: Project[];

  constructor(private projectService: ProjectsService, private modalService: BsModalService) {}

  ngOnInit(): void {
    this.taskstates = EnumHelper.getEnumOptions(TaskState);

    this.projectService.getAll().subscribe(
      (items) => {
        this.projects = items;
      },
      (err) => {}
    );
  }
}
