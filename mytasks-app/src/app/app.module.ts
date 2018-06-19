import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpModule, Jsonp } from '@angular/http';
import { ModalModule } from 'ngx-bootstrap';

import { AppRoutingModule } from './app-routing.module';
import { ComponentsModule } from './components/components.module';
import { ServicesModule } from './services/services.module';

import { AppComponent } from './components/app/app.component';


@NgModule({
  imports: [
    BrowserModule,
    HttpModule,
    AppRoutingModule,
    ComponentsModule,
    ServicesModule,
    ModalModule.forRoot()
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
