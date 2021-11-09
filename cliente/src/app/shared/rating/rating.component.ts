import { Component, OnInit,Input,Output,EventEmitter } from '@angular/core';
import { Profile,ProfilesService,UserService} from 'src/app/core';
import { NotificationService } from 'src/app/core';
import { of } from 'rxjs';
import { Router } from '@angular/router';
import { concatMap ,  tap } from 'rxjs/operators';
import { ChangeDetectorRef } from '@angular/core';
import { ChangeDetectionStrategy } from '@angular/core';
@Component({
  selector: 'app-rating',
  templateUrl: './rating.component.html',
  styleUrls: ['./rating.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class RatingComponent implements OnInit {

  constructor(
    private info : NotificationService,
    private profileService: ProfilesService,
    private router: Router,
    private cd: ChangeDetectorRef,
    private userService: UserService
  ) { }

  @Input() profile!: Profile;
  @Output() toggle = new EventEmitter<boolean>();
  isSubmitting = false;
  value : any;




  ngOnInit(): void {
console.log(this.profile);
  }

  onValueChange($event: number) {
    this.value = $event
    console.log(this.value);
    console.log(this.profile);
     this.userService.isAuthenticated.pipe(concatMap(
      (authenticated) => {
          //Si no esta loegueado, no poodrá valorar un producto
        if (!authenticated) {
          this.router.navigateByUrl('/login');
          this.info.Error('Inicia sesión para poder punturar nuestros productos','Inicia sesion')
          return of(null);
        }

        // Puntua el articulo si el usuuario aun no ha hecho ninguna valoración a ese producto
        if (this.profile.rating === undefined) {
          console.log(this.profile.rating);
          return this.profileService.rating(this.profile.username,this.value)
          .pipe(tap(
            data => {
              console.log(data);
              this.isSubmitting = false;
              this.toggle.emit(true);
            },
            err => {
              console.log(err);
              this.isSubmitting = false
            }
          ));

        // Si ya ha hecho una valoracion, actualiza esa valoración
        } else {
          return this.profileService.rating(this.profile.username,this.value)
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
