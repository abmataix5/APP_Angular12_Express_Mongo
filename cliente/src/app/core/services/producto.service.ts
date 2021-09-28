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

  getProductos(): Observable<any> {
    console.log('in');
    return this.http.get<Producto[]>(environment.url);
  }
  getProducto(slug: string | null):Observable<Producto> {
    console.log('inSingle');
    return this.http.get<Producto>(environment.url + '/'+slug );
  }

}
