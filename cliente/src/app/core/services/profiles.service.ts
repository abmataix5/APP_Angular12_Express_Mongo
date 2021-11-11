import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { ApiService } from './api.service';
import { Profile } from '../models';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ProfilesService {
  constructor (
    private apiService: ApiService
  ) {}

  get(username: string): Observable<Profile> {
    return this.apiService.get('/profiles/' + username)
      .pipe(map((data: {profile: Profile}) => data.profile));
  }

  getFollowers(username: string): Observable<Profile> {
    console.log(username);
    return this.apiService.get('/profiles/followers/' + username) 
  }

  getFollowing(username: string): Observable<Profile> {
    console.log(username);
    return this.apiService.get('/profiles/following/' + username)    
  }

  follow(username: string): Observable<Profile> {
    console.log(username);
    return this.apiService.post('/profiles/' + username + '/follow');
  }

  unfollow(username: string): Observable<Profile> {
    return this.apiService.delete('/profiles/' + username + '/follow');
  }


  rating(username: string,value:any): Observable<Profile> {

    let values = {
      username : username,
      value : value
    }

    let query=JSON.stringify(values);
    
    return this.apiService.post('/profiles/rating/' + query);
  }


}