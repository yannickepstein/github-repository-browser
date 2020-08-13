import { Component, OnInit } from '@angular/core';
import { Store, select } from '@ngrx/store';
import { Observable } from 'rxjs';
import * as RepositoryActions from 'src/app/state/repository/repository.actions';
import * as ContributionActions from 'src/app/state/contribution/contribution.actions';
import { GithubRepository } from 'src/app/model/githubRepository';
import { selectAllRepositories } from 'src/app/state/index';

@Component({
  selector: "repository-browser",
  templateUrl: "./repositoryBrowser.component.html"
})
export class RepositoryBrowserComponent implements OnInit {

  repositories$: Observable<GithubRepository[]>;
  loadedRepositoryContributors: { [id: string]: boolean } = {};
  showDetailsOfRepository: { [id: string]: boolean } = {};

  constructor(private store: Store<any>) {}

  ngOnInit() {
    this.repositories$ = this.store.pipe(select(selectAllRepositories));
    this.store.dispatch(RepositoryActions.loadRepositories());
  }

  toggleDetails(repository: GithubRepository) {
    if (this.loadedRepositoryContributors[repository.id] === undefined) {
      this.loadRepositoryContributors(repository);
      this.showDetailsOfRepository[repository.id] = true;
    } else {
      this.showDetailsOfRepository[repository.id] = !this.showDetailsOfRepository[repository.id];
    }
  }

  loadRepositoryContributors(repository: GithubRepository) {
    this.store.dispatch(ContributionActions.loadContributionsOfRepository({ repositoryId: repository.id, repositoryNameAndOwner: repository.nameWithOwner }));
    this.loadedRepositoryContributors[repository.id] = true;
  }
}