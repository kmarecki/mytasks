import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { AppComponent } from './app.component';
import { ProjectsComponent } from './projects/projects.component';
import { TasksComponent } from './tasks/tasks.component';

export const sharedConfig: NgModule = {
    bootstrap: [AppComponent],
    declarations: [],
    imports: [
        RouterModule.forRoot([
            { path: '', redirectTo: 'app', pathMatch: 'full' },
            { path: 'projects', component: ProjectsComponent },
            { path: 'tasks', component: TasksComponent },
        ])
    ]
};