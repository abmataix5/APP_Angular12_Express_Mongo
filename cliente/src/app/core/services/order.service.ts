import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { environment } from 'src/environments/environment.dev';
import { Producto } from '../models/producto.model';
import { Filter } from '..';
import { ApiService } from './api.service';
import { Order } from '..';

@Injectable({
  providedIn: 'root'
})
export class OrderService {

  constructor(
    private http:HttpClient,
    private apiService :ApiService
  ) { }

  /* Buy */

  buy(slug:any): Observable<Producto> {

    return this.apiService.post('/order/' + slug + '/buy');
  }

/*   get_my_prod(): Observable<Order> {

    return this.http.get<Order>(environment.url + '/order');

  }
 */
  get_my_prod(): Observable<Order[]> {
    return this.http.get<Order[]>(environment.url + `/order/`);
  }


  rating(value:object): Observable<Order> {

   

    let query=JSON.stringify(value);
    console.log(query);
    
    return this.apiService.put('/order/' + query);
  }



}
