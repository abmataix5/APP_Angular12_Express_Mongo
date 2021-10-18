import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment.dev';
import { Producto } from '../models/producto.model';
@Injectable({
  providedIn: 'root'
})
export class ProductoService {

  constructor(private http:HttpClient) { }

  getProductos(params:any): Observable<any> {
    console.log('inHome');

    let query  = "?limit="+params[`limit`]+"&offset="+params[`offset`];

    // console.log(this.http.get<Producto[]>(environment.url + '/producto'+ query));
    return this.http.get<Producto[]>(environment.url + '/producto'+ query);
  }
  getProducto(slug: string | null):Observable<Producto> {
    console.log('inSingle');
    return this.http.get<Producto>(environment.url + '/producto/'+slug );
  }

  getProducto_catego(tipo: string | null):Observable<any> {
    console.log('inCatego');
    return this.http.get<Producto>(environment.url + '/producto/categoria/'+ tipo );
  }

  getProducto_search(search: string | null):Observable<any> {
    console.log('inSearch');
    return this.http.get<Producto>(environment.url + '/producto/search/'+ search );
  }

}
