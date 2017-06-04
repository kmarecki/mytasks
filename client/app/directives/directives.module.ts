import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FocusDirective } from './focus/focus.directive';
import { RedDirective } from './red/red.directive';

@NgModule({
  imports: [
    CommonModule
  ],
  exports: [FocusDirective, RedDirective],
  declarations: [FocusDirective, RedDirective]
})
export class DirectivesModule { }
