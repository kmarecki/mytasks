import { Injectable } from '@angular/core';
import { RestService } from '../rest-service';
import { Project } from './project';

@Injectable()
export class ProjectsService extends RestService<Project> {

    protected getBaseUrl(): string {
        return "api/projects";
    }
}

