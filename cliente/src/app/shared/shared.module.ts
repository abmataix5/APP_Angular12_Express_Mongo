import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ListProductosComponent } from './list-productos/list-productos.component';
import { HeaderComponent } from './layout/header.component';



@NgModule({
  declarations: [
    ListProductosComponent,
    HeaderComponent
    
  ],
  imports: [
    CommonModule,
    HeaderComponent
  ]
})
export class SharedModule { }
