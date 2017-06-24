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
import { ListItemDirective } from './projects/list-item.directive';
import { EntityFormComponent } from './projects/entity-form.component';

import { RedDirective } from '../directives/red/red.directive';
import { ProjectItemComponent } from './projects/project-item.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    RouterModule,
    DirectivesModule
  ],
  declarations: [EditFormDirective, ListItemDirective, ProjectsEditComponent, SettingsComponent, TasksComponent, ProjectsComponent, NavmenuComponent, AppComponent, DashboardComponent, ProjectItemComponent],
  entryComponents: [ProjectsEditComponent, ProjectItemComponent]
})
export class ComponentsModule { }
