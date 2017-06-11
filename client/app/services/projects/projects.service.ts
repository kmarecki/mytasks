import { Injectable } from '@angular/core';
import { Http, Headers, Response } from '@angular/http';

import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/toPromise';

import { Project } from './project';

@Injectable()
export class ProjectsService {

    private readonly baseUrl = 'api/projects';
    private readonly headers = new Headers({ 'Content-Type': 'application/json' })

    constructor(private http: Http) { }

    getProjects(): Observable<Project[]> {
        const url = 'api/projects';
        return this.http.get(this.baseUrl)
            .map(this.extractData)
            .catch(this.handleError);
    }

    getProject(id: number): Promise<Project> {
        const url = `${this.baseUrl}/${id}`;
        return this.http.get(url)
            .toPromise()
            .then(response => response.json().data as Project)
            .catch(this.handleError);
    }

    create(projectName: string): Promise<Project> {
        const data = { projectName: projectName };
        return this.http.post(this.baseUrl, JSON.stringify(data), { headers: this.headers })
            .toPromise()
            .then(res => res.json().data as Project)
            .catch(this.handleError);
    }

    update(project: Project): Promise<Project> {
        const url = `${this.baseUrl}/${project.projectId}`;
        return this.http
            .put(url, JSON.stringify(project), { headers: this.headers })
            .toPromise()
            .then(res => res.json().data as Project)
            .catch(this.handleError);
    }

    delete(id: number): Promise<void> {
        const url = `${this.baseUrl}/${id}`;
        return this.http
            .delete(url, { headers: this.headers })
            .toPromise()
            .then(() => null)
            .catch(this.handleError);
    }
    private extractData(res: Response) {
        let body = res.json();
        return body.data || {};
    }
    private handleError(error: Response | any) {
        let errMsg: string;
        if (error instanceof Response) {
            const body = error.json() || '';
            const err = body.error || JSON.stringify(body);
            errMsg = `${error.status} - ${error.statusText || ''} ${err}`;
        } else {
            errMsg = error.message ? error.message : error.toString();
        }
        return Observable.throw(errMsg);
    }
}

