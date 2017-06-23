import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { DirectivesModule } from '../directives/directives.module';

import { SettingsComponent } from './settings/settings.component';
import { TasksComponent } from './tasks/tasks.component';
import { ProjectsComponent } from './projects/projects.component';
import { ProjectsEditComponent } from './projects/projects-edit.component';
import { NavmenuComponent } from './navmenu/navmenu.component';
import { AppComponent } from './app/app.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { EditFormDirective } from './projects/edit-form.directive';

import {RedDirective} from '../directives/red/red.directive';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    RouterModule,
    DirectivesModule
  ],
  declarations: [EditFormDirective, ProjectsEditComponent, SettingsComponent, TasksComponent, ProjectsComponent, NavmenuComponent, AppComponent, DashboardComponent],
  entryComponents: [ProjectsEditComponent]
})
export class ComponentsModule { }
