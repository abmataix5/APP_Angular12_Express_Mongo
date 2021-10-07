import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule } from '@angular/router';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

import { ListProductosComponent } from './list-productos/list-productos.component';
import { ListItemProductosComponent } from './list-item-productos/list-item-productos.component';
import { CategoriesComponent } from './categories/categories.component';
import { CarouselComponent } from './carousel';
import { CategoriesItemComponent } from './categories-item/categories-item.component';
import { InfiniteScrollModule } from 'ngx-infinite-scroll';
import { SearchComponent } from './search/search.component';

// import { FilterProductosComponent } from './filter-productos/filter-productos.component';



@NgModule({
  declarations: [
    ListProductosComponent,
    ListItemProductosComponent,
    CategoriesComponent,
    CarouselComponent,
    CategoriesItemComponent,
    SearchComponent
    // FilterProductosComponent

    
  ],
  imports: [
    CommonModule,
    HttpClientModule,
    RouterModule,
    InfiniteScrollModule,
    // FilterProductosComponent,
    NgbModule
    
  ],

  exports: [
    CarouselComponent,
    CategoriesComponent,
    ListProductosComponent,
    // FilterProductosComponent,
    CommonModule,
    HttpClientModule,
    RouterModule,
    NgbModule,
    SearchComponent
]
})

export class SharedModule { }
