import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { map, switchMap, mergeMap, catchError } from 'rxjs/operators';
import * as uuid from 'uuid';

import { RepositoryContributionsService } from '../../core/services/repositoryContributions.service';
import { GithubUserContributionTranslatorService } from '../../core/services/githubUserContributionTranslator.service';
import * as ContributionActions from './contribution.actions';
import * as UserActions from '../user/user.actions';
import * as CachingActions from '../caching/caching.actions';
import { GithubUser } from '../../model/githubUser';
import { GithubContribution } from '../../model/githubContribution';

@Injectable()
export class ContributionEffects {

  constructor(
    private actions$: Actions,
    private repositoryContributionsService: RepositoryContributionsService,
    private githubUserContributionTranslatorService: GithubUserContributionTranslatorService
  ) {}

  loadContributorsOfRepository = createEffect(() => {
    return this.actions$.pipe(
      ofType(ContributionActions.loadContributionsOfRepository),
      switchMap(action => {
        return this.repositoryContributionsService.getTopContributorsOfRepository(action.repositoryNameAndOwner).pipe(
          map(data => {
            const contributingUsers: GithubUser[] = data.map(githubUserContribution => {
              return this.githubUserContributionTranslatorService.translateGithubUserContributionToUser(githubUserContribution)
            });

            const contributions: GithubContribution[]  = data.map(contributinUserResponse => {
              return { id: uuid.v4(), repositoryId: action.repositoryId, userId: contributinUserResponse.id, number: contributinUserResponse.contributions }
            });

            return { contributingUsers: contributingUsers, contributions: contributions };
          }),
          mergeMap(repositoryContributions => [
            ContributionActions.loadContributionsOfRepositoryFinished({ contributions: repositoryContributions.contributions }),
            CachingActions.cacheRepositoryContributions({ contributions: repositoryContributions.contributions }),
            UserActions.loadUsersFinished({ users: repositoryContributions.contributingUsers })
          ])
        )
          // TODO add error handling by dispatching an error state
          /*catchError(errorMessage => {
          })*/
      })
    )
  });
}