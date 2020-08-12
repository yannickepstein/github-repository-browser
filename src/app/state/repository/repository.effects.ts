import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { of } from 'rxjs';
import { map, switchMap, catchError } from 'rxjs/operators';
import { RepositoryService } from '../../core/services/repository.service';
import { GithubRepositoryTranslatorService } from '../../core/services/githubRepositoryTranslator.service';
import * as RepositoryActions from './repository.actions';


@Injectable()
export class RepositoryEffects {

  loadRepositories$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(RepositoryActions.loadRepositories),
      switchMap(() => {
        return this.repositoryService.getFirstRepositoriesLimitedTo(50).pipe(
          map(({data}) => {
            return RepositoryActions.loadRepositoriesFinished({
              repositories: this.githubRepositoryTranslatorService.translateRepositoryEdges(data.search.edges)
            });
          }),
          catchError(errorMessage => {
            return of(RepositoryActions.loadRepositoriesError({errorMessage: errorMessage}));
          })
        )
      })
    )
  });

  constructor(
    private actions$: Actions,
    private repositoryService: RepositoryService,
    private githubRepositoryTranslatorService: GithubRepositoryTranslatorService
  ) { }
}