import { Component, Input } from '@angular/core';

import { Task } from '../../services/tasks/task';
import { TaskState } from './../../services/tasks/task-state';
import { ListItemComponent } from '../entity-form/list-item.component';

@Component({
  selector: 'app-task-item',
  templateUrl: './task-item.component.html',
})
export class TaskItemComponent implements ListItemComponent<Task>  {
  @Input() item: object | Task;

  getStateName(state: TaskState): string {
    return TaskState[state];
  }
}
