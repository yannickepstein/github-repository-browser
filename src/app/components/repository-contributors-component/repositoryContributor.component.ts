import { Component, Input, OnInit } from '@angular/core';
import { Store, select } from '@ngrx/store';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { GithubUser } from '../../model/githubUser';
import { selectUserById } from '../../state/index';

@Component({
  selector: "repository-contributor",
  templateUrl: "./repositoryContributor.component.html"
})
export class RepositoryContributorComponent implements OnInit {

  @Input() contributingUserId: string;

  contributingUser$: Observable<GithubUser>;

  constructor(private store: Store<any>) {}

  ngOnInit() {
    this.contributingUser$ = this.store.pipe(
      select(selectUserById, { id: this.contributingUserId })
    );
  }
}