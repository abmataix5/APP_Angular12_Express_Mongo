import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProfileRoutingModule } from './profile-routing.module';
import { RouterModule } from '@angular/router';
import { ProfileComponent } from './profile.component';
import { ProfileArticlesComponent } from './profile-articles.component';
import { ProfileFavoritesComponent } from './profile-favorites.component';
import { SharedModule } from '../shared';
import { ProfileFollowedComponent } from './profile-followed.component';

@NgModule({
  imports: [
    CommonModule,
    ProfileRoutingModule,
    RouterModule,
    SharedModule,
   
  ],
  declarations: [
    ProfileComponent,
    ProfileArticlesComponent,
    ProfileFavoritesComponent,
    ProfileFollowedComponent
    
    
],
  providers:[
    
  ]
 
})
export class ProfileModule { }
