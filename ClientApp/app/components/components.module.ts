import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

import { SettingsComponent } from './settings/settings.component';
import { TasksComponent } from './tasks/tasks.component';
import { ProjectsComponent } from './projects/projects.component';
import { NavmenuComponent } from './navmenu/navmenu.component';
import { AppComponent } from './app/app.component';
import { DashboardComponent } from './dashboard/dashboard.component';

@NgModule({
  imports: [
    CommonModule,
    RouterModule
  ],
  declarations: [SettingsComponent, TasksComponent, ProjectsComponent, NavmenuComponent, AppComponent, DashboardComponent]
})
export class ComponentsModule { }
