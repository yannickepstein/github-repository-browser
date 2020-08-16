import { Component } from '@angular/core';
import { Store } from '@ngrx/store';

import * as RepositoryActions from 'src/app/state/repository/repository.actions';

@Component({
  selector: "repository-search",
  templateUrl: "./repositorySearch.component.html"
})
export class RepositorySearchComponent {

  searchTerm: string = '';

  constructor(private store: Store<any>) { }

  updateRepositoryFilter() {
    this.store.dispatch(RepositoryActions.filterRepositories({ searchTerm: this.searchTerm }));
  }
}