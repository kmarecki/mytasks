import { Injectable } from '@angular/core';
import { RestService } from '../rest-service';
import { Task, TaskView } from './Task';
import { Observable } from 'rxjs';


@Injectable()
export class TasksService extends RestService<Task> {

  protected getBaseUrl(): string {
    return "api/tasks";
  }

  getAllFromView(): Observable<[TaskView]> {
    
    const url = `${this.getRootUrl()}/backend/tasks/view`;
    return this.http.get(url)
        .map(this.extractData)
        .catch(this.handleError);
}
}
