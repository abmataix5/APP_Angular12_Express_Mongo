import { Component, OnInit, ChangeDetectionStrategy, ChangeDetectorRef } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Filter, Profile, User } from '../core';
import { ProfilesService, UserService, NotificationService} from 'src/app/core';


@Component({
  selector: 'app-profile-followed',
  templateUrl: './profile-followed.component.html',
  styleUrls: ['./profile-followed.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ProfileFollowedComponent implements OnInit {

  listFollowers : any;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private cd: ChangeDetectorRef,
    private profilesService: ProfilesService,
    // private _user: User
  ) { }

  username: any;
  profile!: Profile;
  followedConfig: Filter = {
  followed: ''
  
  };

  ngOnInit(): void {

    this.username = this.router.url.split("/")[2];   /* Cojemos nombre de usuario de la URL */
    this.followedConfig.followed = this.username;  /* Lo podemos en followedConfig */
    this.followedConfig.stateFilter = true;
    // this.cd.markForCheck();

    this.profilesService.getFollowers(this.username).subscribe(

      (data) => {
        console.log("**** RESPUESTA FOLLOWED*************");
        console.log(data.profile.followers);
        console.log(data);
        this.profile = data.profile.followers;
        /* console.log(this.profile.profile); */
        this.listFollowers= data.profile.followers;
        this.cd.markForCheck();
     },
     (error) => {
       console.log(error);
     }

    );



  } //end ngOnInit

}
