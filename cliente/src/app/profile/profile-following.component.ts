import { Component, OnInit , ChangeDetectionStrategy, ChangeDetectorRef} from '@angular/core';
import { Router } from '@angular/router';
import { Filter, Profile } from '../core';
import { ProfilesService} from 'src/app/core';

@Component({
  selector: 'app-profile-following',
  templateUrl: './profile-following.component.html',
  styleUrls: ['./profile-following.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ProfileFollowingComponent implements OnInit {

  constructor(
    private router: Router,
    private cd: ChangeDetectorRef,
    private profilesService: ProfilesService,
  ) { }

  username: any;
  profile!: Profile;
  followedConfig: Filter = {
  followed: ''
  
  };

  listFollowing : any;

  ngOnInit(): void {

    this.username = this.router.url.split("/")[2];   /* Cojemos nombre de usuario de la URL */
    this.followedConfig.followed = this.username;  /* Lo podemos en followedConfig */
    this.followedConfig.stateFilter = true;

    this.profilesService.getFollowing(this.username).subscribe(

      (data) => {
        this.listFollowing= data.profile.following;
        this.cd.markForCheck();
     },
     (error) => {
       console.log(error);
     }

    );


  }

}
