import { ChangeDetectorRef, Component, OnInit, Input,Output, EventEmitter} from '@angular/core';
import { Router } from '@angular/router';
import { ProfilesService, UserService,Profile} from 'src/app/core';
import { concatMap ,  tap } from 'rxjs/operators';
import { of } from 'rxjs';

@Component({
  selector: 'app-follow',
  templateUrl: './follow.component.html'
})
export class FollowComponent implements OnInit {

  constructor(
    private profilesService: ProfilesService,
    private router : Router,
    private userService : UserService,
    private cd : ChangeDetectorRef 
  ) { }

  ngOnInit(): void {
  }

  @Input() profile!: Profile;
  @Output() toggle = new EventEmitter<boolean>();
  isSubmitting = false;


  toggleFollowing() {
    this.isSubmitting = true;
  

    this.userService.isAuthenticated.pipe(concatMap(
      (authenticated) => {
        // Not authenticated? Push to login screen
        if (!authenticated) {
          this.router.navigateByUrl('/login');
          return of(null);
        }

        // Follow this profile if we aren't already
        if (!this.profile?.following) {
          return this.profilesService.follow(this.profile?.username)
          .pipe(tap(
            data => {
              this.isSubmitting = false;
              this.toggle.emit(true);
            },
            err => this.isSubmitting = false
          ));

        // Otherwise, unfollow this profile
        } else {
          return this.profilesService.unfollow(this.profile.username)
          .pipe(tap(
            data => {
              this.isSubmitting = false;
              this.toggle.emit(false);
            },
            err => this.isSubmitting = false
          ));
        }
      }
    )).subscribe(() => {
      this.cd.markForCheck();
    });
  }

}
