import { Component, Input, OnInit } from '@angular/core';
import { Store, select } from '@ngrx/store';
import { Observable } from 'rxjs';

import * as ContributionSelectors from '../../state/contribution/contribution.selectors';
import { GithubContribution } from 'src/app/model/githubContribution';

@Component({
  selector: "repository-details",
  templateUrl: "./repositoryDetails.component.html",
  styleUrls: ["./repositoryDetails.component.css"]
})
export class RepositoryDetailsComponent implements OnInit {

  @Input() repositoryId: string;

  contributionsForRepository$: Observable<GithubContribution[]>;

  constructor(private store: Store<any>) {}

  ngOnInit() {
    this.contributionsForRepository$ = this.store.pipe(
      select(ContributionSelectors.selectAllContributionsForRepository, { repositoryId: this.repositoryId })
    );
  }
}