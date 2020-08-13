import { Component, Input, OnInit } from '@angular/core';
import { Store, select } from '@ngrx/store';
import { Observable } from 'rxjs';

import * as ContributionSelectors from '../../state/contribution/contribution.selectors';

@Component({
  selector: "repository-details",
  templateUrl: "./repositoryDetails.component.html"
})
export class RepositoryDetailsComponent implements OnInit {

  @Input() repositoryId: string;

  contributingUserIds$: Observable<string[]>;

  constructor(private store: Store<any>) {}

  ngOnInit() {
    this.contributingUserIds$ = this.store.pipe(
      select(ContributionSelectors.selectAllContributingUserIdsForRepository, { repositoryId: this.repositoryId })
    );
  }
}