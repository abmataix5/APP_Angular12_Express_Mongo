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


    let query  = "?limit="+params[`limit`]+"&offset="+params[`offset`];
    
    return this.http.get<Producto[]>(environment.url + '/producto'+ query);
  }

  getProducto(slug: string | null):Observable<Producto> {

    return this.http.get<Producto>(environment.url + '/producto/'+slug );
  }

  getProducto_catego(tipo: string | null):Observable<any> {

    return this.http.get<Producto>(environment.url + '/producto/categoria/'+ tipo );
  }

  getProducto_search(search: string | null):Observable<any> {

    return this.http.get<Producto>(environment.url + '/producto/search/'+ search );
  }

  getProducto_filter(filters: Filter | null):Observable<any> {

  
    let query=JSON.stringify(filters);
   

    
    return this.http.get<Producto>(environment.url + '/producto/filter/'+ query);
  }

  // favorite, unfavorite

  favorite(slug:any): Observable<Producto> {

    return this.apiService.post('/producto/' + slug + '/favorite');
  }

  unfavorite(slug:any): Observable<Producto> {
    return this.apiService.delete('/producto/' + slug + '/favorite');
  }

/* Buy */

  buy(slug:any): Observable<Producto> {

    return this.apiService.post('/order/' + slug + '/buy');
  }

  delete_bought_prod(slug:any): Observable<Producto> {
console.log('deeelte');
    return this.apiService.delete('/order/' + slug + '/delete');
  }




}
