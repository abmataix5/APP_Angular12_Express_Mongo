import { Component, OnInit,Input,Output,EventEmitter } from '@angular/core';
import { Producto ,ProductoService,UserService} from 'src/app/core';
import { NotificationService } from 'src/app/core';
import { of } from 'rxjs';
import { Router } from '@angular/router';
import { concatMap ,  tap } from 'rxjs/operators';
import { ChangeDetectorRef } from '@angular/core';
import { ChangeDetectionStrategy } from '@angular/core';
@Component({
  selector: 'app-rating',
  templateUrl: './rating.component.html',
  styleUrls: ['./rating.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class RatingComponent implements OnInit {

  constructor(
    private info : NotificationService,
    private productService: ProductoService,
    private router: Router,
    private cd: ChangeDetectorRef,
    private userService: UserService
  ) { }

  @Input() producto!: Producto;
  @Output() toggle = new EventEmitter<boolean>();
  isSubmitting = false;
  value : any;




  ngOnInit(): void {

  }

  onValueChange($event: number) {
    this.value = $event
    console.log(this.value);
    console.log(this.producto);
    this.userService.isAuthenticated.pipe(concatMap(
      (authenticated) => {
          //Si noesta loegueado, no poodrá valorar un producto
        if (!authenticated) {
          this.router.navigateByUrl('/login');
          this.info.Error('Inicia sesión para poder punturar nuestros productos','Inicia sesion')
          return of(null);
        }

        // Puntua el articulo si el usuuario aun no ha hecho ninguna valoración a ese producto
        if (this.producto.rating === 0) {
     
          return this.productService.rating(this.producto.slug,this.value)
          .pipe(tap(
            data => {
              console.log(data);
              this.isSubmitting = false;
              this.toggle.emit(true);
            },
            err => {
              console.log(err);
              this.isSubmitting = false
            }
          ));

        // Si ya ha hecho una valoracion, actualiza esa valoración
        } else {
          return this.productService.rating(this.producto.slug,this.value)
          .pipe(tap(
            data => {
              this.isSubmitting = false;
              this.toggle.emit(false);
            },
            err => this.isSubmitting = false
          ));
        }

      }
      )).subscribe(() => {
        this.cd.markForCheck();
      });
  }

  

}
