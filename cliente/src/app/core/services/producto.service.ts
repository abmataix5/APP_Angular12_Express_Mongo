import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

import { environment } from 'src/environments/environment.dev';
import { Producto } from '../models/producto.model';
import { Filter } from '..';
import { ApiService } from './api.service';
@Injectable({
  providedIn: 'root'
})
export class ProductoService {

  constructor(
    private http:HttpClient,
    private apiService :ApiService
    ) { }

  getProductos(params:any): Observable<any> {
  /*   console.log('inShopPaginated'); */

    let query  = "?limit="+params[`limit`]+"&offset="+params[`offset`];
    
    return this.http.get<Producto[]>(environment.url + '/producto'+ query);
  }

  getProducto(slug: string | null):Observable<Producto> {
/*     console.log('inSingle'); */
    return this.http.get<Producto>(environment.url + '/producto/'+slug );
  }

  getProducto_catego(tipo: string | null):Observable<any> {
  /*   console.log('inCatego'); */
    return this.http.get<Producto>(environment.url + '/producto/categoria/'+ tipo );
  }

  getProducto_search(search: string | null):Observable<any> {
  /*   console.log('inSearch'); */
    return this.http.get<Producto>(environment.url + '/producto/search/'+ search );
  }

  getProducto_filter(filters: Filter | null):Observable<any> {
    /* console.log('inFilters'); */
    console.log(filters);
  
    let query=JSON.stringify(filters);
   
    console.log(query);
    
    return this.http.get<Producto>(environment.url + '/producto/filter/'+ query);
  }

  // favorite, unfavorite

  favorite(slug:any): Observable<Producto> {
    console.log(slug);
    return this.apiService.post('/producto/' + slug + '/favorite');
  }

  unfavorite(slug:any): Observable<Producto> {
    return this.apiService.delete('/producto/' + slug + '/favorite');
  }

}
