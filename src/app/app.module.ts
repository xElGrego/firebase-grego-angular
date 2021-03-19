import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { ReactiveFormsModule , FormsModule} from '@angular/forms';

/* Dependencia: Agregando la paginación => npm i ngx-pagination --save  */
import { NgxPaginationModule } from 'ngx-pagination';

import { NgbModule } from '@ng-bootstrap/ng-bootstrap'


//Firebase
import {AngularFireModule} from '@angular/fire'
import {environment} from '../environments/environment'

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    NgxPaginationModule, 
    ReactiveFormsModule,FormsModule,
    NgbModule,
    AngularFireModule.initializeApp(environment.firebase)

  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
