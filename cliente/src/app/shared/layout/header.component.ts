import { Component, OnInit, ChangeDetectionStrategy, ChangeDetectorRef } from '@angular/core';
import { User, UserService } from '../../core';
@Component({
  selector: 'app-layout',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class HeaderComponent implements OnInit {


  constructor(
    private userService: UserService,
    private cd: ChangeDetectorRef
  ) { }
  currentUser?: User;
  username : any;

  ngOnInit(): void {

    this.userService.currentUser.subscribe(
      (userData) => {
        console.log(userData.username);
        this.currentUser = userData;
        this.username = this.currentUser.username;
        console.log(this.currentUser.username)
        this.cd.markForCheck();
      }
    );

  }

}
