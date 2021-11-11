import { Component, OnInit, ChangeDetectionStrategy, ChangeDetectorRef } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { Filter, Profile, UserService } from '../core';

@Component({
  selector: 'app-profile-articles',
  templateUrl: './profile-articles.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ProfileArticlesComponent implements OnInit {
  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private cd: ChangeDetectorRef
  ) {}


  username: any;
  profile?: Profile;
  articlesConfig: Filter = {
      author: ''
  };

  ngOnInit() {
    this.username = this.router.url.split("/")[2];
    this.articlesConfig.author = this.username;
    this.cd.markForCheck();

    
  }

}
