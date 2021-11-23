import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { ProfileArticlesComponent } from './profile-articles.component';
import { ProfileFollowedComponent } from './profile-followed.component';
import { ProfileFollowingComponent } from './profile-following.component';
//Components favoritos,profile,productos
import { ProfileFavoritesComponent } from './profile-favorites.component';
import { ProfileResolver } from './profile-resolver.service'; 
import { ProfileComponent } from './profile.component';



const routes: Routes = [
  {
    path: ':username',
    component: ProfileComponent,
    resolve: {
      profile: ProfileResolver
    } ,
    children: [
      {
        path: 'favorites',
        component: ProfileFavoritesComponent
      },{
        path:'followed',
        component: ProfileFollowedComponent
      },{
        path:'following',
        component: ProfileFollowingComponent
      },{
        path:'',
        component: ProfileArticlesComponent
      }
    ] 
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ProfileRoutingModule {}