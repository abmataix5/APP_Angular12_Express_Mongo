import {  ChangeDetectorRef,ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { ActivatedRoute ,Router} from '@angular/router';
import { concatMap, tap } from 'rxjs/operators';
import { Profile, User, UserService } from '../core';


@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush

})

export class ProfileComponent implements OnInit {
  constructor(
    private route: ActivatedRoute,
    private userService: UserService,
    private cd: ChangeDetectorRef

  )

  {}
 
  profile!: Profile;
  currentUser!: User;
  isUser!: boolean;


  ngOnInit() {
    console.log(    this.route.data
      )
    this.route.data
      .pipe(
        concatMap((data:any) => {
          console.log(data)
          this.profile = data.profile;
          console.log(this.profile)
          // Load the current user's data.
          return this.userService.currentUser.pipe(
            tap((userData: User) => {
              this.currentUser = userData;
              console.log(userData)

              this.isUser = this.currentUser.username === this.profile.username;
              console.log(this.isUser)
            })
          );
        })
      )
      .subscribe(() => {
        this.cd.markForCheck();
      });
  }


}