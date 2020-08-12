import { Component, OnInit } from '@angular/core';

import { Store, select } from '@ngrx/store';
import { Observable } from 'rxjs';

import { startSpinner, stopSpinner } from '../../state/spinner/spinner.actions';

import { RepositoryService } from '../../core/services/repository.service';

@Component({
  selector: "repository-browser",
  templateUrl: "./repositoryBrowser.component.html"
})
export class RepositoryBrowserComponent implements OnInit {
  spinner$: Observable<boolean>;
  repositories: any[];
  loading = true;
  error: any;

  constructor(private store: Store<any>, private repositoryService: RepositoryService) { }

  ngOnInit() {
    this.spinner$ = this.store.pipe(select(state => state.spinner.isOn));
    this.store.dispatch(startSpinner());
    this.repositoryService.getFirstRepositoriesLimitedTo(20).subscribe(repositories => {
      this.repositories = repositories;
      this.store.dispatch(stopSpinner());
    }, error => {
      this.store.dispatch(stopSpinner());
      this.error = error;
    });
  }
}