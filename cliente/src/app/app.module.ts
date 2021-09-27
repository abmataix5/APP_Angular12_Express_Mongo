import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import {

  HeaderComponent
  
} from './shared';

//Componentes(Pages)
import { ShopModule } from './shop/shop.module';
import { DetailsComponent } from './details/details.component';
import { HomeModule } from './home/home.module';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HomeModule,
    ShopModule
    
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
