import { Component, OnInit, ChangeDetectionStrategy, ChangeDetectorRef } from '@angular/core';
import { ActivatedRoute ,Router} from '@angular/router';

import { concatMap, tap } from 'rxjs/operators';
import { NotificationService, Order, OrderService, Profile, User, UserService } from '../core';


@Component({
  selector: 'app-pedidos',
  templateUrl: './pedidos.component.html',
  styleUrls: ['./pedidos.component.scss']
})
export class PedidosComponent implements OnInit {

  
  constructor(
    private info : NotificationService,
    private orderService : OrderService,
    private route: ActivatedRoute,
    private userService: UserService,
    private cd: ChangeDetectorRef

  ) { }

  value: any;
  profile!: Profile;
  currentUser!: User;
  isUser!: boolean;
  order : Order[] = [];
  id_vend : any;


  ngOnInit(): void {
     this.getProductsBuyUser();
  }

  

  getProductsBuyUser(){

    this.orderService.get_my_prod().subscribe(

      (data) => {
         this.order = data;      /* Obtenemos los productos comprados por el usuario activo */
     },
     (error) => {
     
       console.log(error);
     }

    );

  }

  procesarRating(valor_order:Order){
    console.log(valor_order);

    
    this.orderService.rating(valor_order).subscribe(

      (data) => {
         console.log(data);
         this.info.Succes('Esto ayudara a augmentar tu karma!','Gracias por ayudar en el sistema de rating!');
         this.cd.markForCheck();
         
     },
     (error) => {
     
       console.log(error);
     }

    );
  }

 

  

}
