import { Component, OnInit, ChangeDetectionStrategy, ChangeDetectorRef } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { ArticleListConfig, Filter, Profile } from '../core';

@Component({
  selector: 'app-profile-favorites',
  templateUrl: './profile-favorites.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ProfileFavoritesComponent implements OnInit {
  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private cd: ChangeDetectorRef
  ) {}

  username: any;
  profile?: Profile;
  favoritesConfig: Filter = {
      favorited: ''
  };

  ngOnInit() {

    this.username = this.router.url.split("/")[2];
    this.favoritesConfig.favorited = this.username;

    console.log(this.favoritesConfig);
    this.cd.markForCheck();

  }

}
