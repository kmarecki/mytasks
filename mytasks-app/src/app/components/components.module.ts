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
import { EntityFormComponent } from './entity-form/entity-form.component';

import { RedDirective } from '../directives/red/red.directive';

import { ProjectsComponent } from './projects/projects.component';
import { ProjectsEditComponent } from './projects/projects-edit.component';

import { TasksComponent } from './tasks/tasks.component';
import { TaskEditComponent } from './tasks/task-edit.component';
import { TaskItemComponent } from './tasks/task-item.component';
import { MessageBoxComponent } from './message-box/message-box.component';
import { ItemsListComponent } from './entity-form/items-list/items-list.component';



@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    RouterModule,
    DirectivesModule
  ],
  declarations: [EditFormDirective, ProjectsEditComponent, SettingsComponent, ProjectsComponent, NavmenuComponent, AppComponent, DashboardComponent,
    TasksComponent, TaskEditComponent, TaskItemComponent, MessageBoxComponent, ItemsListComponent
  ],
  entryComponents: [ProjectsEditComponent, TaskEditComponent, TaskItemComponent, MessageBoxComponent ]
})
export class ComponentsModule { }
