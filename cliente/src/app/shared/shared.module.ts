import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule } from '@angular/router';

import { ListProductosComponent } from './list-productos/list-productos.component';
import { ListItemProductosComponent } from './list-item-productos/list-item-productos.component';
import { CategoriesComponent } from './categories/categories.component';
import { CarouselComponent } from './carousel';
import { CategoriesItemComponent } from './categories-item/categories-item.component';


@NgModule({
  declarations: [
    ListProductosComponent,
    ListItemProductosComponent,
    CategoriesComponent,
    CarouselComponent,
    CategoriesItemComponent

    
  ],
  imports: [
    CommonModule,
    HttpClientModule,
    RouterModule
  ],

  exports: [
    CarouselComponent,
    CategoriesComponent,
    ListProductosComponent,
    CommonModule,
    HttpClientModule,
    RouterModule
]
})
export class SharedModule { }
