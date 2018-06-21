import {
  Component, ComponentFactoryResolver, Type
} from '@angular/core';

import { BsModalService } from 'ngx-bootstrap/modal';

import { Task } from '../../services/tasks/task';
import { TasksService } from '../../services/tasks/tasks.service';

import { TaskEditComponent } from './task-edit.component';
import { TaskItemComponent } from './task-item.component';
import { EntityFormComponent } from '../entity-form/entity-form.component';
import { ListColumnModel } from '../entity-form/list-header/list.header.model';

@Component({
  selector: 'app-tasks',
  templateUrl: '../entity-form/entity-form.component.html',
  styleUrls: ['./tasks.component.css'],
  providers: [TasksService]
})
export class TasksComponent extends EntityFormComponent<Task>  {

  protected getTitle(): string {
    return 'Tasks';
  }

  protected getColumns(): ListColumnModel[] {
    return [
      new ListColumnModel("name", "Name", 4),
      new ListColumnModel("state", "State", 3),
      new ListColumnModel("create", "Created", 3),
      new ListColumnModel("planned", "Planned", 1),
      new ListColumnModel("actual", "Actual", 1),
    ]
  }

  protected getEditFormComponent(): Type<{}> {
    return TaskEditComponent;
  }

  protected getListItemComponent(): Type<{}> {
    return TaskItemComponent;
  }

  protected newEntity(): Task {
    return new Task();
  }

  protected createEntityFromEditor() {
    return { taskName: this.editor.entity.taskName }
  }

  protected getId(entity: Task): number {
    return entity.taskId;
  }

  constructor(
    taskService: TasksService,
    componentFactoryResolver: ComponentFactoryResolver,
    modalService: BsModalService
  ) {
    super(taskService, componentFactoryResolver, modalService);
  }


}
