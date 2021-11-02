import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment.dev';
import { Categoria } from '../models/categoria.model';
@Injectable({
  providedIn: 'root'
})
export class CategoriesService {

  constructor(private http:HttpClient) { }


  getCategorias(): Observable<any> {
    console.log('in');
    return this.http.get<Categoria[]>(environment.url + '/categoria');
  }
  getCategoria(slug: string | null):Observable<Categoria> {
    console.log('inSingle');
    return this.http.get<Categoria>(environment.url + '/categoria/'+slug );
  }

}
