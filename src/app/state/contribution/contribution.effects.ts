import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { map, switchMap, mergeMap, catchError } from 'rxjs/operators';
import { of } from 'rxjs';
import * as uuid from 'uuid';

import { RepositoryContributionsService } from '../../core/services/repositoryContributions.service';
import { GithubUserTranslatorService } from '../../core/services/githubUserTranslator.service';
import * as ContributionActions from './contribution.actions';
import * as UserActions from '../user/user.actions';
import { GithubUser } from '../../model/githubUser';
import { GithubContribution } from '../../model/githubContribution';

@Injectable()
export class ContributionEffects {

  constructor(
    private actions$: Actions,
    private repositoryContributionsService: RepositoryContributionsService,
    private githubUserTranslatorService: GithubUserTranslatorService
  ) {}

  loadContributorsOfRepository = createEffect(() => {
    return this.actions$.pipe(
      ofType(ContributionActions.loadContributionsOfRepository),
      switchMap(action => {
        return this.repositoryContributionsService.getTopContributorsOfRepository(action.repositoryNameAndOwner).pipe(
          map(data => {
            const contributingUsers: GithubUser[] = data.map(rawGithubUser => {
              return this.githubUserTranslatorService.translateGithubUser(rawGithubUser)
            });

            const contributions: GithubContribution[]  = contributingUsers.map(contributingUser => {
              return { id: uuid.v4(), repositoryId: action.repositoryId, userId: contributingUser.id }
            });

            return { contributingUsers: contributingUsers, contributions: contributions };
            /*return ContributionActions.loadContributionsOfRepositoryFinished({
              contributions: contributions
            });*/
          }),
          mergeMap(repositoryContributions => [
            ContributionActions.loadContributionsOfRepositoryFinished({ contributions: repositoryContributions.contributions }),
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