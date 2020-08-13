import {
  createSelector,
  createFeatureSelector,
  ActionReducerMap,
} from '@ngrx/store';
import * as repository from './repository/repository.reducer';
import * as user from './user/user.redcuer';
import * as contribution from './contribution/contribution.reducer';

import { GithubUser } from '../model/githubUser';
import { GithubContribution } from '../model/githubContribution';
import { isDate } from 'util';

export interface State {
  repositories: repository.RepositoryState,
  users: user.UserState,
  contributions: contribution.ContributionState
}

export const reducers: ActionReducerMap<State> = {
  repositories: repository.repositoryReducer,
  users: user.userReducer,
  contributions: contribution.contributionReducer
}

export const selectRepositoryState = createFeatureSelector<repository.RepositoryState>('repositories');
export const selectAllRepositories = createSelector(
  selectRepositoryState,
  repository.selectAllRepositories
);

export const selectUserState = createFeatureSelector<user.UserState>('users');
export const selectUserEntities = createSelector(selectUserState, user.selectUserEntities)
export const selectUserById = createSelector(
  selectUserEntities,
  (entities: { [id: string]: GithubUser }, props: { id: string }) => {
    return entities[props.id];
  }
);
export const selectUsersByIds = createSelector(
  selectUserEntities,
  (entities: { [id: string]: GithubUser }, props: { ids: string[] }) => {
    console.log(props.ids);
    return props.ids.map(id => entities[id]);
  }
);

export const selectContributionState = createFeatureSelector<contribution.ContributionState>('contributions');
export const selectAllContributions = createSelector(
  selectContributionState,
  contribution.selectAllContributions
);
export const selectAllContributingUserIdsForRepository = createSelector(
  selectAllContributions,
  (contributions: GithubContribution[], props: { repositoryId: string }) => {
    return contributions
      .filter(contribution => contribution.repositoryId === props.repositoryId)
      .map(contribution => contribution.userId);
  }
);