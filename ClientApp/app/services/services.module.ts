import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProjectsService } from './projects/projects.service';

@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [],
  providers: [ProjectsService]
})
export class ServicesModule { }