import { ChangeDetectorRef, Component, OnInit, Input,Output, EventEmitter} from '@angular/core';
import { Router } from '@angular/router';
import { ProfilesService, UserService,Profile, NotificationService} from 'src/app/core';
import { concatMap ,  tap } from 'rxjs/operators';
import { of } from 'rxjs';

@Component({
  selector: 'app-follow',
  templateUrl: './follow.component.html'
})
export class FollowComponent implements OnInit {

  constructor(
    private info : NotificationService,
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
          this.info.Error('Inicia sesión para poder seguir a usuarios','Inicia sesión');
          this.router.navigateByUrl('/login');
          return of(null);
        }
console.log(this.profile);
        // Follow this profile if we aren't already
        if (!this.profile.following) {
          console.log(this.profile.username);
          return this.profilesService.follow(this.profile?.username)
          .pipe(tap(
            data => {
              this.info.Succes('Ahora sigues a ' + this.profile.username,'Nuevo follow');
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
              this.info.Error('Has dejado de seguir a ' + this.profile.username,'Unfollow');
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
