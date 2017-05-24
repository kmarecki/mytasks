import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule, Jsonp } from '@angular/http';
import { RouterModule } from '@angular/router';

import { AppComponent } from './app.component';
import { TasksComponent } from './tasks/tasks.component';
import { ProjectsComponent } from './projects/projects.component';
import { NavmenuComponent } from './navmenu/navmenu.component';

@NgModule({
  declarations: [
    AppComponent,
    TasksComponent,
    ProjectsComponent,
    NavmenuComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    RouterModule.forRoot([
      { path: '', redirectTo: 'app', pathMatch: 'full' },
      { path: 'projects', component: ProjectsComponent },
      { path: 'tasks', component: TasksComponent },
    ])
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
