import { NgModule } from '@angular/core';


import { ShopRoutingModule } from './shop-routing.module';
import { ShopComponent } from './shop.component';
import { SharedModule } from '../shared';

@NgModule({
  declarations: [ShopComponent],
  imports: [
    ShopRoutingModule,
    SharedModule
  ]
})
export class ShopModule { }
