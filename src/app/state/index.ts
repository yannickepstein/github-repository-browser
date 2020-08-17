import { ActionReducerMap } from '@ngrx/store';

import * as repository from './repository/repository.reducer';
import * as user from './user/user.redcuer';
import * as contribution from './contribution/contribution.reducer';
import * as caching from './caching/caching.reducer';

export interface State {
  repositories: repository.RepositoryState,
  users: user.UserState,
  contributions: contribution.ContributionState,
  caching: caching.CachingState
}

export const reducers: ActionReducerMap<State> = {
  repositories: repository.repositoryReducer,
  users: user.userReducer,
  contributions: contribution.contributionReducer,
  caching: caching.cachingReducer
};