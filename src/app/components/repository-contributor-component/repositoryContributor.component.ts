import { Component, Input, OnInit } from '@angular/core';
import { Store, select } from '@ngrx/store';
import { Observable } from 'rxjs';

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

  constructor(private store: Store<any>) {}

  ngOnInit() {
    this.contributingUser$ = this.store.pipe(
      select(UserSelectors.selectUserById, { id: this.contributingUserId })
    );
  }
}