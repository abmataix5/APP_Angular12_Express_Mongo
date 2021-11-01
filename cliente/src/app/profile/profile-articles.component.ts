import { Component, OnInit, ChangeDetectionStrategy, ChangeDetectorRef } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { Filter, Profile } from '../core';

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
    this.articlesConfig.favorited = this.username;
    this.cd.markForCheck();
  /*   this.route.parent.data.subscribe(
      (data: {profile: Profile}) => {
        this.profile = data.profile;
        this.articlesConfig = {
          type: 'all',
          filters: {}
        }; // Only method I found to refresh article load on swap
        this.articlesConfig.filters.author = this.profile.username;
        this.cd.markForCheck();
      }
    ); */
  }

}
