import { Injectable } from '@angular/core';
import { Http, Response} from '@angular/http';

import { Project } from './project';

@Injectable()
export class ProjectService {
    getProjects(): Promise<Project[]> {
        const projects: Project[] =  [
             { projectName: "Project 1", description: "Some description" },
             { projectName: "Project 2", description: "Some description"}
        ]
        return Promise.resolve(projects);
    }
}

