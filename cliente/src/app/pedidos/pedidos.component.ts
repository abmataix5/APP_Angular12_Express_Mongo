import { Component, OnInit, ChangeDetectionStrategy, ChangeDetectorRef } from '@angular/core';
import { ActivatedRoute ,Router} from '@angular/router';
import { concatMap, tap } from 'rxjs/operators';
import { Order, OrderService, Profile, User, UserService } from '../core';


@Component({
  selector: 'app-pedidos',
  templateUrl: './pedidos.component.html',
  styleUrls: ['./pedidos.component.scss']
})
export class PedidosComponent implements OnInit {

  constructor(
    private orderService : OrderService,
    private route: ActivatedRoute,
    private userService: UserService,
    private cd: ChangeDetectorRef
  ) { }


  profile!: Profile;
  currentUser!: User;
  isUser!: boolean;
  order : Order[] = [];

  ngOnInit(): void {

  
     this.getProductsBuyUser();
  }

  

  getProductsBuyUser(){

    this.orderService.get_my_prod().subscribe(

      (data) => {

   console.log(data);
         this.order = data;  


       
     },
     (error) => {
     
       console.log(error);
     }

    );

  }
  

}
