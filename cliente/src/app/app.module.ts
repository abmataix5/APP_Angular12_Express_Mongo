import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
//Paginación
import { NgxPaginationModule } from 'ngx-pagination';
//Reactive forms
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
//Header component
import {HeaderComponent,SharedModule} from './shared';
//Toastr
import{BrowserAnimationsModule} from '@angular/platform-browser/animations'
import{ToastrModule} from 'ngx-toastr';

import { AuthModule } from './auth/auth.module';
import { ProfileComponent } from './profile/profile.component';
import { CoreModule } from './core';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent
    
  ],
  imports: [
    SharedModule,
    CoreModule,
    HttpClientModule,
    BrowserModule,
    AppRoutingModule,
    NgbModule,
    NgxPaginationModule,
    FormsModule,
    AuthModule,
    FormsModule,
    ReactiveFormsModule,
    ToastrModule.forRoot(),
    BrowserAnimationsModule
    
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
