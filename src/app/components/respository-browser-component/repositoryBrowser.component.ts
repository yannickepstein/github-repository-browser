import { Component, OnInit } from '@angular/core';

import { Store, select } from '@ngrx/store';
import { Observable } from 'rxjs';
import { loadRepositories } from 'src/app/state/repository/repository.actions';

import { GithubRepository } from 'src/app/model/githubRepository';

@Component({
  selector: "repository-browser",
  templateUrl: "./repositoryBrowser.component.html"
})
export class RepositoryBrowserComponent implements OnInit {

  repositories$: Observable<GithubRepository[]>;
  loadingRepositories$: Observable<boolean>;
  loadRepositoriesError$: Observable<string>;

  constructor(private store: Store<any>) { }

  ngOnInit() {
    this.repositories$ = this.store.pipe(select(state => state.repositories.items));
    this.loadingRepositories$ = this.store.pipe(select(state => state.repositories.loading));
    this.loadRepositoriesError$ = this.store.pipe(select(state => state.repositories.error));
    this.store.dispatch(loadRepositories());
  }
}