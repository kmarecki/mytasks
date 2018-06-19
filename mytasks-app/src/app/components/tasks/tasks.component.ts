import {
  Component, ComponentFactoryResolver, Type
} from '@angular/core';

import { BsModalService } from 'ngx-bootstrap/modal';

import { Task } from '../../services/tasks/task';
import { TasksService } from '../../services/tasks/tasks.service';

import { TaskEditComponent } from './task-edit.component';
import { TaskListHeaderComponent } from './task-list-header.component';
import { TaskItemComponent } from './task-item.component';
import { EntityFormComponent } from '../entity-form/entity-form.component';

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

  protected getNameProperty(): string {
    return 'taskName';
  }

  protected getEditFormComponent(): Type<{}> {
    return TaskEditComponent;
  }

  protected getListHeaderComponent(): Type<{}> {
    return TaskListHeaderComponent;
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