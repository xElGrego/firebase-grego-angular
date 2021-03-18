import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

 /* Dependencia: Agregando la paginación => npm i ngx-pagination --save  */
import {NgxPaginationModule} from 'ngx-pagination'

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    NgxPaginationModule
    
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
