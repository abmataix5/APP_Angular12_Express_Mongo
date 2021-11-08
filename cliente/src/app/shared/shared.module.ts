import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule } from '@angular/router';
import { NgRatingBarModule } from 'ng-rating-bar';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

import { ListProductosComponent } from './list-productos/list-productos.component';
import { ListItemProductosComponent } from './list-item-productos/list-item-productos.component';
import { CategoriesComponent } from './categories/categories.component';
import { CarouselComponent } from './carousel';
import { CategoriesItemComponent } from './categories-item/categories-item.component';
import { InfiniteScrollModule } from 'ngx-infinite-scroll';
import { SearchComponent } from './search/search.component';
import { NgxPaginationModule } from 'ngx-pagination';
import { FilterProductosComponent } from './filter-productos/filter-productos.component';
import { FormsModule } from '@angular/forms';
import { ShowAuthedDirective } from './show-authed.directive';
import { FavoriteButtonComponent } from './buttons/favorite-button.component';
import { RatingComponent } from './rating/rating.component';
import { FollowComponent } from './buttons/follow.component';


@NgModule({
  declarations: [
    ListProductosComponent,
    ListItemProductosComponent,
    CategoriesComponent,
    CarouselComponent,
    CategoriesItemComponent,
    SearchComponent,
    FilterProductosComponent,
    ShowAuthedDirective,
    FavoriteButtonComponent,
    RatingComponent,
    FollowComponent

  ],
  imports: [
    CommonModule,
    HttpClientModule,
    RouterModule,
    InfiniteScrollModule,
    NgbModule,
    NgxPaginationModule,
    FormsModule,
    NgRatingBarModule
    
  ],

  exports: [
    ListItemProductosComponent,
    CarouselComponent,
    CategoriesComponent,
    ListProductosComponent,
    FilterProductosComponent,
    CommonModule,
    HttpClientModule,
    RouterModule,
    NgbModule,
    SearchComponent,
    NgxPaginationModule,
    ShowAuthedDirective,
    FavoriteButtonComponent,
    RatingComponent,
    FollowComponent
]
})

export class SharedModule { }
