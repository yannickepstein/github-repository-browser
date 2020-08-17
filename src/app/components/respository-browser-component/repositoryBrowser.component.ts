import { Component, OnInit } from '@angular/core';
import { Store, select } from '@ngrx/store';
import { Observable } from 'rxjs';

import * as RepositoryActions from 'src/app/state/repository/repository.actions';
import * as ContributionActions from 'src/app/state/contribution/contribution.actions';
import { GithubRepository } from 'src/app/model/githubRepository';
import * as RepositorySelectors from 'src/app/state/repository/repository.selectors';
import * as CachingSelectors from 'src/app/state/caching/caching.selectors';

@Component({
  selector: "repository-browser",
  templateUrl: "./repositoryBrowser.component.html",
  styleUrls: ['./repositoryBrowser.component.css']
})
export class RepositoryBrowserComponent implements OnInit {

  repositories$: Observable<GithubRepository[]>;
  repositorySearchTerm$: Observable<string>;
  selectedRepositoryId$: Observable<string>;
  repositoryIdsWithCachedContributions: Set<string>;

  constructor(private store: Store<any>) {}

  ngOnInit() {
    this.repositories$ = this.store.pipe(select(RepositorySelectors.selectAllRepositories));
    this.repositorySearchTerm$ = this.store.pipe(select(RepositorySelectors.selectRepositorySearchTerm));
    this.selectedRepositoryId$ = this.store.pipe(select(RepositorySelectors.selectSelectedRepositoryId));
    this.store
      .select(CachingSelectors.selectRepositoryIdsWithCacheContributions)
      .subscribe(repositoryIds => {
        this.repositoryIdsWithCachedContributions = repositoryIds;
      });
    this.store.dispatch(RepositoryActions.loadRepositories());
  }

  toggleDetails(repository: GithubRepository) {
    if (!this.repositoryIdsWithCachedContributions.has(repository.id)) {
      this.loadRepositoryContributors(repository);
    }
    this.store.dispatch(RepositoryActions.selectRepository({ repositoryId: repository.id }));
  }

  loadRepositoryContributors(repository: GithubRepository) {
    this.store.dispatch(ContributionActions.loadContributionsOfRepository({ repositoryId: repository.id, repositoryNameAndOwner: repository.nameWithOwner }));
  }
}