import { Injectable, } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve, Router, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs';

import { Producto,ProductoService } from '../core';
import { catchError } from 'rxjs/operators';

@Injectable({
    providedIn: 'root'
  })
  export class DetailsResolver implements Resolve<Producto> {
    constructor(
      private productoService: ProductoService,
      private router: Router
    ) {}
  
    resolve(
      route: ActivatedRouteSnapshot,
      //state: RouterStateSnapshot
    ): Observable<any> {
  
      return this.productoService.getProducto(route.params['slug'])
        .pipe(catchError((err) => this.router.navigateByUrl('/details')));
    }
  }