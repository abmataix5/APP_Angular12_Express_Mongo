import { NgModule } from '@angular/core';


import { ShopRoutingModule } from './shop-routing.module';
import { ShopComponent } from './shop.component';
import { SharedModule } from '../shared';
import { NgxPaginationModule } from 'ngx-pagination';

@NgModule({
  declarations: [ShopComponent],
  imports: [
    ShopRoutingModule,
    SharedModule,
    NgxPaginationModule
  ]
})
export class ShopModule { }
