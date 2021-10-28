import { Component, EventEmitter, Input, Output, ChangeDetectionStrategy, ChangeDetectorRef } from '@angular/core';
import { Router } from '@angular/router';
import { NotificationService } from 'src/app/core/services';
import { Producto, ProductoService
  , UserService } from '../../core';
import { of } from 'rxjs';
import { concatMap ,  tap } from 'rxjs/operators';

@Component({
  selector: 'app-favorite-button',
  templateUrl: './favorite-button.component.html',
  styleUrls: ['./favorite-button.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class FavoriteButtonComponent {
  constructor(
    private productService: ProductoService,
    private router: Router,
    private userService: UserService,
    private cd: ChangeDetectorRef,
    private info : NotificationService
  ) {}

  @Input() producto!: Producto;
  @Output() toggle = new EventEmitter<boolean>();
  isSubmitting = false;

  ngOnInit(): void {

    console.log(this.producto.favorited);
    
  }


  toggleFavorite() {
    this.isSubmitting = true;

    this.userService.isAuthenticated.pipe(concatMap(
      (authenticated) => {
        // Not authenticated? Push to login screen
        if (!authenticated) {
          this.router.navigateByUrl('/login');
          this.info.Error('Debes iniciar sesión para poder dar LIKE','Inicia sesion')
          return of(null);
        }

        // Favorite the article if it isn't favorited yet
        if (!this.producto.favorited) {
     
          return this.productService.favorite(this.producto.slug)
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

        // Otherwise, unfavorite the article
        } else {
          return this.productService.unfavorite(this.producto.slug)
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
