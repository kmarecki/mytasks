import { ListHeaderDirective } from './entity-form/list-header.directive';
import { TaskListHeaderComponent } from './tasks/task-list-header.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { DirectivesModule } from '../directives/directives.module';

import { SettingsComponent } from './settings/settings.component';

import { NavmenuComponent } from './navmenu/navmenu.component';
import { AppComponent } from './app/app.component';
import { DashboardComponent } from './dashboard/dashboard.component';

import { EditFormDirective } from './entity-form/edit-form.directive';
import { ListItemDirective } from './entity-form/list-item.directive';
import { EntityFormComponent } from './entity-form/entity-form.component';

import { RedDirective } from '../directives/red/red.directive';

import { ProjectsComponent } from './projects/projects.component';
import { ProjectsEditComponent } from './projects/projects-edit.component';
import { ProjectItemComponent } from './projects/project-item.component';
import { ProjectListHeaderComponent } from './projects/project-list-header.component';

import { TasksComponent } from './tasks/tasks.component';
import { TaskEditComponent } from './tasks/task-edit.component';
import { TaskItemComponent } from './tasks/task-item.component';
import { MessageBoxComponent } from './message-box/message-box.component';



@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    RouterModule,
    DirectivesModule
  ],
  declarations: [EditFormDirective, ListHeaderDirective, ListItemDirective, ProjectsEditComponent, SettingsComponent, ProjectsComponent, NavmenuComponent, AppComponent, DashboardComponent, ProjectItemComponent,
    ProjectListHeaderComponent, TasksComponent, TaskEditComponent, TaskListHeaderComponent, TaskItemComponent, MessageBoxComponent
  ],
  entryComponents: [ProjectsEditComponent, ProjectListHeaderComponent, ProjectItemComponent, TaskEditComponent, TaskListHeaderComponent, TaskItemComponent, MessageBoxComponent ]
})
export class ComponentsModule { }
