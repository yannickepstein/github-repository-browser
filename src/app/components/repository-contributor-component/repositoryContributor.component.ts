import { Component, Input, OnInit } from '@angular/core';
import { Store, select } from '@ngrx/store';
import { Observable } from 'rxjs';
import { GithubUserUrlPipe } from 'src/app/core/pipes/githubUserUrl.pipe';

import { GithubUser } from '../../model/githubUser';
import * as UserSelectors from '../../state/user/user.selectors';

@Component({
  selector: "repository-contributor",
  templateUrl: "./repositoryContributor.component.html"
})
export class RepositoryContributorComponent implements OnInit {

  @Input() contributingUserId: string;
  @Input() numberOfContributions: number;

  contributingUser$: Observable<GithubUser>;

  constructor(private store: Store<any>,
              private githubUserUrlPipe: GithubUserUrlPipe) {}

  ngOnInit() {
    this.contributingUser$ = this.store.pipe(
      select(UserSelectors.selectUserById, { id: this.contributingUserId })
    );
  }

  openInNewTab(url: string) {
    window.open(url, "_blank");
  }
}