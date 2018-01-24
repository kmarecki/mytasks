import { Injectable } from '@angular/core';
import { RestService } from '../rest-service';
import { Task } from './Task';


@Injectable()
export class TasksService extends RestService<Task> {

  protected getBaseUrl(): string {
    return "api/tasks";
  }

}
