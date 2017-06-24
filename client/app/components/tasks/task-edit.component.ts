import { Component, Input, Type } from '@angular/core';

import { EditFormComponent } from '../entity-form/edit-form.component';
import { Task } from '../../services/tasks/task';

@Component({
    templateUrl: './task-edit.component.html'
})
export class TaskEditComponent implements EditFormComponent<Task> {
    @Input() entity: Task
}
