import { Component, OnInit, ChangeDetectionStrategy, ChangeDetectorRef } from '@angular/core';
import { User, UserService } from '../../core';
import { Router } from '@angular/router';
import { NotificationService } from 'src/app/core/services';
@Component({
  selector: 'app-layout',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class HeaderComponent implements OnInit {


  constructor(
    private info : NotificationService,
    private router: Router,
    private userService: UserService,
    private cd: ChangeDetectorRef
  ) { }
  currentUser?: User;
  username : any;

  ngOnInit(): void {

    this.userService.currentUser.subscribe(
      (userData) => {
      
        this.currentUser = userData;
        this.username = this.currentUser.username;
        this.cd.markForCheck();
      }
    );

  }


  logout() {
    this.userService.purgeAuth();
    this.router.navigateByUrl('/');
    this.info.Error('Cerrando Sesión...','Log Out');
  }

}
