import {
  Component, ComponentFactoryResolver, Type
} from '@angular/core';

import { BsModalService } from 'ngx-bootstrap/modal';

import { Task } from '../../services/tasks/task';
import { TasksService } from '../../services/tasks/tasks.service';

import { TaskEditComponent } from './task-edit.component';
import { TaskItemComponent } from './task-item.component';
import { EntityFormComponent } from '../entity-form/entity-form.component';
import { ListColumnModel } from '../entity-form/items-list/items-list.model';
import { TaskState } from '../../services/tasks/task-state';

@Component({
  selector: 'app-tasks',
  templateUrl: '../entity-form/entity-form.component.html',
  styleUrls: ['./tasks.component.css'],
  providers: [TasksService]
})
export class TasksComponent extends EntityFormComponent<Task, TasksService>  {

  protected getTitle(): string {
    return 'Tasks';
  }

  private getStateName(state: TaskState): string {
    return TaskState[state];
  }

  protected getColumns(): ListColumnModel[] {
    return [
      new ListColumnModel("projectName", "Project", 2),
      new ListColumnModel("taskName", "Name", 3),
      new ListColumnModel("state", "State", 2, true, (state) => this.getStateName(state)),
      new ListColumnModel("created", "Created", 3),
      new ListColumnModel("plannedHours", "Planned", 1),
      new ListColumnModel("actualHours", "Actual", 1),
    ]
  }

  protected getEditFormComponent(): Type<{}> {
    return TaskEditComponent;
  }

  protected newEntity(): Task {
    return new Task();
  }

  protected getId(entity: Task): number {
    return entity.taskId;
  }

  protected getAll() {
    return this.service.getAllFromView();
  }

  constructor(
    taskService: TasksService,
    componentFactoryResolver: ComponentFactoryResolver,
    modalService: BsModalService
  ) {
    super(taskService, componentFactoryResolver, modalService);
  }


}
