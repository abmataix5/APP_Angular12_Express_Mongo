import { Component, EventEmitter, Input, Output, ChangeDetectionStrategy, ChangeDetectorRef } from '@angular/core';
import { Producto } from 'src/app/core';
import { Router } from '@angular/router';
import { NotificationService } from 'src/app/core/services';
import {  ProductoService
  , UserService } from '../../core';
import { of } from 'rxjs';
import { concatMap ,  tap } from 'rxjs/operators';
@Component({
  selector: 'app-buy',
  templateUrl: './buy.component.html',
  styleUrls: ['./buy.component.css']
})
export class BuyComponent {

  constructor(
    private productService: ProductoService,
    private router: Router,
    private userService: UserService,
    private cd: ChangeDetectorRef,
    private info : NotificationService
  ) { }

  @Input() producto!: Producto;
  @Output() toggle = new EventEmitter<boolean>();
  isSubmitting = false;
delet_purchase?:any;
product_bought?:any;
  ngOnInit(): void {
  }


  toggleBuy() {
    this.isSubmitting = true;

    this.userService.isAuthenticated.pipe(concatMap(
      (authenticated) => {

        // Si no esta registrado, no deja hacer la compra, y nos envia al login!

        if (!authenticated) {
          this.router.navigateByUrl('/login');
          this.info.Error('Debes iniciar sesión para poder comprar productos','Inicia sesion')
          return of(null);
        }

        // Buy product
        if (this.producto) {
     
          return this.productService.buy(this.producto.slug)
          .pipe(tap(
            data => {
          
              this.isSubmitting = false;
              this.toggle.emit(true);
              this.product_bought= data;
              this.info.Succes('Compra realizada con éxito!','Buena Compra!!');
              this.router.navigateByUrl('/'); 
            },
            err => {
              console.log(err);
              this.isSubmitting = false
            }
          ));

        // 
        } else {
          return 'Error';
        }

      }
    )).subscribe(() => {
      this.cd.markForCheck();
    });
  }

}
