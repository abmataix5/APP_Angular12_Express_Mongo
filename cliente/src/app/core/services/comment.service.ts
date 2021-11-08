import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { ApiService } from './api.service';
import { Comment } from '../models';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class CommentService {

  constructor(
    private apiService: ApiService
  ) { }

  add(slug:string | undefined, payload:any): Observable<Comment> {
    return this.apiService
    .post(
      `/producto/${slug}/comments`,
      { comment: { body: payload } }
    ).pipe(map(data => data.comment));
  }

  getAll(slug:string | undefined): Observable<Comment[]> {
    console.log(slug);
    return this.apiService.get(`/producto/${slug}/comments`)
      .pipe(map(data => data.comment));
  }

  destroy(commentId:any, productoSlug:any) {
    return this.apiService
           .delete(`/producto/${productoSlug}/comments/${commentId}`);
  }

}



