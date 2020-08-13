import { Component, Input, OnInit } from '@angular/core';
import { Store, select } from '@ngrx/store';
import { Observable } from 'rxjs';

import { selectAllContributingUserIdsForRepository } from '../../state/index';

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
      select(selectAllContributingUserIdsForRepository, { repositoryId: this.repositoryId })
    );
  }
}