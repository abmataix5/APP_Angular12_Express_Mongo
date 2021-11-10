import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from '../shared';
import { RouterModule } from '@angular/router';
import { PedidosComponent } from './pedidos.component';
import { PedidosRoutingModule } from './pedidos-routing.module';



@NgModule({
  declarations: [PedidosComponent],
  imports: [
    CommonModule,
    RouterModule,
    SharedModule,
    PedidosRoutingModule
  ]
})
export class PedidosModule { }
